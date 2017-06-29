'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Gabs',
      'user_id',
      {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    );
  },

  down: function (queryInterface, Sequelize) {

  }
};
