const path = require('path');
      express = require('express');
      mustacheExpress = require('mustache-express');
      bodyParser = require('body-parser');
      expressValidator = require('express-validator');
      session = require('express-session');
      postgres = require('pg');
      sequelize = require('sequelize');
      routes = require('./routes/router.js');
      app = express();


const models = require('./models');

      app.engine('mustache', mustacheExpress());
      app.set('views', path.join(__dirname, 'views'));
      app.set('view engine', 'mustache');
      app.set('layout', 'layout');
      // app.set('layout', 'layout');

      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(expressValidator({
        additionalVaidators: 'equals'
      }));
      app.use(session({
        secret: 'unicorntime',
        resave: false,
        saveUninitialized: false
      }));

      app.use('/static', express.static(path.join(__dirname, 'public')));

      routes(app);

      app.listen(3000);
