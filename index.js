'use strict';

module.exports = {
  name: 'ember-cli-page-progress',

  included() {
    this._super.included.apply(this, arguments);

    let findHost = this._findHost || findHostShim;
    let app = findHost.call(this);

    this.app = app;
    let options = Object.assign({}, { includeCss: true }, app.options['ember-cli-page-progress']);
    
    if (options.includeCss) {
      app.import('vendor/ember-cli-page-progress.css');
    }
  }
};
