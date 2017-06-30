const session = require('express-session');
const express = require('express');
const parseurl = require('parseurl');

const app = express();

app.use(session({
  secret : 'unicorntime',
  resave : false,
  saveUninitialized : false
}));

module.exports = {
  redirectMiddleware: function(req, res, next){
    var pathname = parseurl(req).pathname;

    if (!req.session.user && pathname != '/login') {
      let qs = pathname != '/login' ? "?next=" + pathname : '';
      res.redirect('/user/login' + qs);
    } else {
      next();
    }
  }
};
