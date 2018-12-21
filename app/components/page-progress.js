import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/page-progress';

export default Component.extend({
  layout,
  tagName: '',
  pageProgress: service(),

  init(...args) {
    this._super(...args);

    get(this, 'pageProgress').setConfig(args[0].attrs);
  },

  barStyle: computed('pageProgress.barStyle', {
    get() {
      return htmlSafe(get(this, 'pageProgress.barStyle'));
    }
  }).readOnly()
});
