'use strict';
module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    user_id: DataTypes.INTEGER,
    text: DataTypes.STRING(140)
  }, {
    classMethods: {
      associate: function(models) {
      
      }
    }
  });
  return Gab;
};
