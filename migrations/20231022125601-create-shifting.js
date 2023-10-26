'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shifting', {
      id_shifting: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      id_division: {
        type: Sequelize.UUID,
        defaultValue: null
      },
      id_shift_type: {
        type: Sequelize.UUID,
        defaultValue: null
      },
      shift_type: {
        type: Sequelize.ENUM("NRM", "HLD", "LNG", "OVT"),
        defaultValue: "NRM"
      },
      id_shift_turn: {
        type: Sequelize.UUID,
        defaultValue: null
      },
      shift_turn: {
        type: Sequelize.ENUM("S1", "S2", "S3", "S4", "XS", "OTH"),
        defaultValue: "OTH"
      },
      shift_start: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      shift_end: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      status_shifting: {
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
    await queryInterface.dropTable('shifting');
  }
};