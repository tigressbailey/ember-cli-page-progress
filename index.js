'use strict';

module.exports = {
  name: 'ember-cli-page-progress',

  included: function (app) {
    this._super.included(app);
    app.import('vendor/ember-cli-page-progress.css');
  }
};
