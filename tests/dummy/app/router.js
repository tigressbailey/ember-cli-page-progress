import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('introduction', { path: '/introduction' });
  this.route('documents', { path: '/documents' });
  this.route('profile', { path: '/profile' });
});
export default Router;
