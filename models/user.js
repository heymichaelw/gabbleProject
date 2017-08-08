'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING(100),
    password: DataTypes.STRING(20)
  }, {});
  User.associate = function(models){
    User.hasMany(models.Gab, {as: 'Gabs', foreignKey: 'user_id', onDelete: 'cascade', hooks: true});
    User.belongsToMany(models.Gab, {
      as: "GabLikes",
      through: "Likes",
      foreignKey: "user_id",
      onDelete: 'cascade',
      hooks: true
    });
  };
  return User;
};
