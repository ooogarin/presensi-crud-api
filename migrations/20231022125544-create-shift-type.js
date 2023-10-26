'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shift_type', {
      id_shift_type: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      type_sname: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      type_lname: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      type_description: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      status_shift_type: {
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
    await queryInterface.dropTable('shift_type');
  }
};