/**
 * Module dependencies.
 */
const path = require('path');

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/index');
const apiController = require('./controllers/api');


module.exports = function(app) {
  /**
   * Primary app routes.
   */
  app.get('/', homeController.index);

  /**
   * API routes.
   */
  app.get('/api/v1', apiController.getApi);


  return app;
}
