import Service from '@ember/service';
import { get, set, setProperties } from '@ember/object';
import { later } from '@ember/runloop';

const TRICKLE_SPEED = 200;
const SPEED = 200;
const MINIMUM = 0.08;
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
  progressStyle: undefined,
  barStyle: undefined,
  status: undefined,
  target: undefined,
  isLoading: false,

  start(target) {
    if (!this.isStarted() || get(this, 'target') !== target) {
      this.setStatus(0);
      setProperties(this, {
        barStyle: 'transition: none; width: 0;',
        target,
        isLoading: true
      })
    }

    this.update();
  },

  update() {
    later(() => {
      if (!this.isStarted()) {
        return;
      }

      this.trickle();
      this.update();
    }, TRICKLE_SPEED);
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
    const started = !this.isStarted();
    const currentStatus = this.clamp(status, MINIMUM, 1);

    setProperties(this, {
      status: currentStatus === 1 ? undefined : currentStatus,
      progressStyle: 'opacity: 1; transition: none;',
      barStyle: `transition: width 0.2s linear; width: ${started ? '0' : this.toBarPerc(get(this, 'status'))}%;`
    });

    queue((next) => {
      if (currentStatus === 1) {
        set(this, 'progressStyle', undefined);

        later(() => {
          set(this, 'barStyle', 'transition: width 0.2s linear; width: 100%;');

          later(() => {
            this.remove();
            next();
          }, 500);
        }, SPEED);
      } else {
        later(next, SPEED);
      }
    });
  },

  remove() {
    setProperties(this, {
      progressStyle: undefined,
      barStyle: 'transition: none; width: 0%;',
      status: undefined,
      target: undefined,
      isLoading: false
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
