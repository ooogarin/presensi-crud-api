'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('account_device', {
      id_device_account: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      imei: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      manufacture: {
        type: Sequelize.STRING(45),
        allowNull: false,
        defaultValue: "-"
      },
      model: {
        type: Sequelize.STRING(45),
        allowNull: false,
        defaultValue: "-"
      },
      release_vesion: {
        type: Sequelize.STRING(5),
        allowNull: false,
        defaultValue: "-"
      },
      sdk_version: {
        type: Sequelize.STRING(5),
        allowNull: false,
        defaultValue: "-"
      },
      app_version: {
        type: Sequelize.STRING(20),
        allowNull: false
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
    await queryInterface.dropTable('account_device');
  }
};