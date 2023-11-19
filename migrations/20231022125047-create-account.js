'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('account', {
      id_account: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      sname_user: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      lname_user: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      mobile: {
        type: Sequelize.STRING(16),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING(45),
        allowNull: true,
        defaultValue: "no_image.png"
      },
      id_account_level: {
        type: Sequelize.INTEGER(1),
        allowNull: false
      },
      role: {
        type: Sequelize.STRING(45),
        defaultValue: "-"
      },
      status_account: {
        type: Sequelize.ENUM("ACT", "NACT"),
        allowNull: false,
        defaultValue: "ACT"
      },
      token: {
        type: Sequelize.STRING(45),
        defaultValue: "-"
      },
      imei: {
        type: Sequelize.STRING(30),
        defaultValue: "-"
      },
      fcm_id: {
        type: Sequelize.STRING(45),
        defaultValue: "-"
      },
      last_login: {
        type: Sequelize.DATE,
        defaultValue: null
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
    await queryInterface.dropTable('account');
  }
};