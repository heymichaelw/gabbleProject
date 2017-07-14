const session = require('express-session');
const models = require('../models');

module.exports = {
  createPage: function(req, res){
    res.render('gabs/create', {});
  },
  create: function(req, res){
    req.getValidationResult().then(function(result){
      if(result.isEmpty()){
        models.Gab.create({
          user_id: req.session.userId,
          text: req.body.gabtext
        });
      }
    });
    res.redirect('create');
  }
};
