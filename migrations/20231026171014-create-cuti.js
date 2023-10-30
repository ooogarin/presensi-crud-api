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
      cuti_description: {
        type: Sequelize.STRING(200)
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