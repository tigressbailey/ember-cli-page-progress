import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Mixin.create({
  pageProgress: service(),

  actions: {
    loading(transition) {
      const pageProgress = get(this, 'pageProgress');

      pageProgress.start(transition.targetName);

      transition.finally(() => {
        pageProgress.done();
      });

      return true;
    }
  }
});
