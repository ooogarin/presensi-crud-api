'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('account_level', [
      {
        id_account_level: 1,
        level_sname: "1",
        level_lname: "User Public",
        level_description: "Digunakan untuk User public/umum. Dapat digunakan tanpa harus Login.",
        status_account_level: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_account_level: 2,
        level_sname: "2",
        level_lname: "User Magang",
        level_description: "Digunakan untuk User dengan status magang.",
        status_account_level: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_account_level: 3,
        level_sname: "3",
        level_lname: "User Karyawan",
        level_description: "Digunakan untuk User Karyawan",
        status_account_level: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_account_level: 4,
        level_sname: "4",
        level_lname: "User Kepala Bagian",
        level_description: "Digunakan untuk User Kepala Bagian",
        status_account_level: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_account_level: 5,
        level_sname: "5",
        level_lname: "User Admin",
        level_description: "Digunakan untuk User Admin",
        status_account_level: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_account_level: 6,
        level_sname: "6",
        level_lname: "User Super Admin",
        level_description: "Digunakan untuk User Super Admin/administrator sistem",
        status_account_level: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('account_level', null, {});
  }
};
