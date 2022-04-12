import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get, getProperties } from '@ember/object';
import { htmlSafe } from '@ember/template';
import layout from '../templates/components/page-progress';

export default Component.extend({
  layout,
  tagName: '',
  pageProgress: service(),

  init(...args) {
    this._super(...args);

    const configs = getProperties(this, 'speed', 'minimum', 'background');
    get(this, 'pageProgress').setConfig(configs);
  },

  barStyle: computed('pageProgress.barStyle', {
    get() {
      return htmlSafe(get(this, 'pageProgress.barStyle'));
    }
  }).readOnly()
});
