'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('account_level', {
      id_account_level: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        primaryKey: true
      },
      level_sname: {   
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      level_lname: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      level_description: {
        type: Sequelize.STRING(100),
        allowNull: false
      }, 
      status_account_level: {
        type: Sequelize.ENUM("ACT", "NACT"),
        allowNull: false,
        defaultValue: "ACT"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('account_level');
  }
};