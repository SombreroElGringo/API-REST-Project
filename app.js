/**
 *  Modules dependencies
 */
const express = require('express');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

/**
 *  Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: '.env.secret'});

/**
 *  Create Express Server
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI,
                 {
                    useMongoClient: true
                 });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

/**
 * Express configuration.
 */
module.exports = require('./config/express')(app, process);

/**
 * App routes.
 */
module.exports = require('./app/routes')(app);

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env')); 
  console.log('-- Press CTRL-C to stop --\n');
});

module.exports = app;
