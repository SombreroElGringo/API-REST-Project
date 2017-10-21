/**
 * Module dependencies.
 */
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const lusca = require('lusca');
const path = require('path');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const logger = require('morgan');

module.exports = function(app, config) {
   app.set('port', process.env.PORT || 3000);
   app.set('json spaces', 2);
   app.set('views', path.join(__dirname, '../app/views'));
   app.set('view engine', 'pug');
   app.use(expressStatusMonitor());
   app.use(logger('dev'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use(expressValidator());
   app.set('trust proxy', 1)
   app.use(session({
       secret: 'API-R3ST-K3Y',
       resave: false,
       saveUninitialized: true,
       cookie: { secure: false }
   }))
   app.use((req, res, next) => {
       if (req.path === '/api/upload') {
           next();
       } else {
           lusca.csrf()(req, res, next);
       }
   });
   app.use(lusca.xframe('SAMEORIGIN'));
   app.use(lusca.xssProtection(true));
   app.use((req, res, next) => {
       res.locals.user = req.user;
       next();
   });
   app.use(express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 }));

   return app;
}
