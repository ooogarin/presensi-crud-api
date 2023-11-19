'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedule', {
      id_schedule: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      id_account: {
        type: Sequelize.UUID,
        allowNull: false
      },
      id_shifting: {
        type: Sequelize.UUID,
        allowNull: false
      },
      shift_schedule: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      status_schedule: {
        type: Sequelize.ENUM("ACT", "NACT"),
        allowNull: false,
        defaultValue: "ACT"
      },
      datetime_created: {
        type: Sequelize.DATE,
        allowNull: false
      },
      datetime_edited: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('schedule');
  }
};