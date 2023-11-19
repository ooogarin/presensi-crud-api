'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cuti', {
      id_cuti: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      id_account: {
        type: Sequelize.UUID
      },
      cuti_start: {
        type: Sequelize.DATEONLY,
        defaultValue: null
      },
      cuti_end: {
        type: Sequelize.DATEONLY,
        defaultValue: null
      },
      cuti_type: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: "-"
      },
      cuti_description: {
        type: Sequelize.TEXT,
        defaultValue: '-'
      },
      cuti_response: {
        type: Sequelize.TEXT,
      defaultValue: '-'
      },
      status_cuti: {
        type: Sequelize.ENUM("WAIT", "ACC", "REJECT"),
        allowNull: false,
        defaultValue: "WAIT"
      },
      datetime_created: {
        allowNull: false,
        type: Sequelize.DATE
      },
      datetime_edited: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cuti');
  }
};