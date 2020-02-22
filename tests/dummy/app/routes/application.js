import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { action, get } from '@ember/object';

export default class Application extends Route {
  @service pageProgress;

  @action
  async loading(transition) {
    const pageProgress = get(this, 'pageProgress');

    pageProgress.start(transition.targetName);

    transition.promise.finally(() => {
      pageProgress.done();
    });

    return true;
  }
}
