import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get, set, setProperties } from '@ember/object';
import { later } from '@ember/runloop';

const SPEED = 200;
const MINIMUM = 0.08;
const BACKGROUND = 'red';
const pendingEvents = [];
const next = () => {
  const pendingEvent = pendingEvents.shift();
  if (pendingEvent) {
    pendingEvent(next);
  }
};

const queue = (fn) => {
  pendingEvents.push(fn);
  next();
};

export default Service.extend({
  router: service(),
  speed: undefined,
  minimum: undefined,
  barStyle: undefined,
  background: undefined,
  status: undefined,
  target: undefined,
  isLoaded: false,

  setConfig(config) {
    const configKeys = Object.keys(config);

    for (let i = 0; i < configKeys.length; i= i+ 1) {
      const value = config[configKeys[i]];

      if (typeof value !== 'undefined') {
        set(this, configKeys[i], value);
      }
    }

    set(this, 'isLoaded', true);
  },

  start(target) {
    if (!get(this, 'isLoaded')) {
      return;
    }

    if (!this.isStarted() || get(this, 'target') !== target) {
      this.setStatus(0);
      setProperties(this, {
        barStyle: 'transition: none; width: 0;',
        target
      })
    }

    this.update();
  },

  update() {
    const speed = get(this, 'speed') || SPEED;

    later(() => {
      if (!this.isStarted()) {
        return;
      }

      this.trickle();
      this.update();
    }, speed);
  },

  trickle(amount) {
    let status = get(this, 'status');
    let currentAmount = amount;

    if (!status) {
      return this.start();
    } else if (status > 1) {
      return;
    } else {
      if (typeof currentAmount !== 'number') {
        if (status >= 0 && status < 0.2) { currentAmount = 0.1; }
        else if (status >= 0.2 && status < 0.5) { currentAmount = 0.04; }
        else if (status >= 0.5 && status < 0.8) { currentAmount = 0.02; }
        else if (status >= 0.8 && status < 0.99) { currentAmount = 0.005; }
        else { currentAmount = 0; }
      }

      status = this.clamp(status + currentAmount, 0, 0.998);

      return this.setStatus(status);
    }
  },

  isStarted() {
    return typeof get(this, 'status') === 'number';
  },

  setStatus(status) {
    const speed = get(this, 'speed') || SPEED;
    const minimum = get(this, 'minimum') || MINIMUM;
    const background = get(this, 'background') || BACKGROUND;
    const started = !this.isStarted();
    const currentStatus = this.clamp(status, minimum, 1);

    setProperties(this, {
      status: currentStatus === 1 ? undefined : currentStatus,
      barStyle: `transition: width ${speed}ms linear;
width: ${started ? '0' : this.toBarPerc(get(this, 'status'))}%;
background: ${background}`
    });

    queue((next) => {
      if (currentStatus === 1) {
          set(this, 'barStyle', `transition: width ${speed}ms linear; width: 100%; background: ${background}`);

          later(() => {
            set(this, 'barStyle', `transition: opacity ${speed * 2}ms linear; width: 100%; opacity: 0; background: ${background}`);
            next();
          }, speed);
      } else {
        later(next, speed);
      }
    });
  },

  done() {
    if (typeof get(this, 'status') === 'undefined') {
      return;
    }

    this.trickle(0.3 + 0.5 * Math.random());
    this.setStatus(1);
  },

  clamp(status, min, max) {
    if (status < min) return min;
    if (status > max) return max;
    return status;
  },

  toBarPerc(status) {
    return status * 100;
  }
});
