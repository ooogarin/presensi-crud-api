'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('locator', {
      id_locator: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      id_shifting: {
        type: Sequelize.UUID,
        allowNull: false
      },
      id_schedule: {
        type: Sequelize.UUID,
        defaultValue: null
      },
      locator_code: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      latitude: {
        type: Sequelize.STRING(45),
        allowNull: false,
        defaultValue: "-"
      },
      longitude: {
        type: Sequelize.STRING(45),
        allowNull: false,
        defaultValue: "-"
      },
      use_location: {
        type: Sequelize.ENUM("Y", "N"),
        allowNull: false,
        defaultValue: "Y"
      },
      status_locator: {
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
    await queryInterface.dropTable('locator');
  }
};