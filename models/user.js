'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING(100),
    password: DataTypes.STRING(20)
  }, {});
  User.associate = function(models){
    User.hasMany(models.Gab, {foreignKey: 'user_id'});
  };
  return User;
};
