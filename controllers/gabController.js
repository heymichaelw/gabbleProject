const session = require('express-session');
const models = require('../models');

module.exports = {
  createPage: function(req, res){
    res.render('gabs/create', {});
  }
};
