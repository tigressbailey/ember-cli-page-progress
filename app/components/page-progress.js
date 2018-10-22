import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/page-progress';

export default Component.extend({
  layout,
  tagName: '',
  pageProgress: service(),

  isLoading: computed('pageProgress.isLoading', {
    get() {
      return get(this, 'pageProgress.isLoading');
    }
  }).readOnly(),

  progressStyle: computed('pageProgress.progressStyle', {
    get() {
      return htmlSafe(get(this, 'pageProgress.progressStyle'));
    }
  }).readOnly(),

  barStyle: computed('pageProgress.barStyle', {
    get() {
      return htmlSafe(get(this, 'pageProgress.barStyle'));
    }
  }).readOnly()
});
