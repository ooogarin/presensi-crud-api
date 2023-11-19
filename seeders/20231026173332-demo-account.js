'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('account', [
      {
        id_account: "2c39e1c3-db7e-4a78-8a6a-2ab41f80145e",
        sname_user: "Anton",
        lname_user: "Anton PaLapa",
        mobile: "081234567890",
        email: "anton@mail.com",
        password: "pass12345",
        avatar: "foto.png",
        id_account_level: "1",
        role: "Karyawan",
        status_account: "ACT",
        token: "-",
        imei: "-",
        fcm_id: "-",
        last_login: "",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_account: "2edc534b-8dbb-4137-a6d1-fd4dd26e7510",
        sname_user: "Mandra",
        lname_user: "Mandra Kondra",
        mobile: "081234567891",
        email: "mandra@mail.com",
        password: "pass12345",
        avatar: "foto.png",
        id_account_level: "1",
        role: "Karyawan",
        status_account: "ACT",
        token: "-",
        imei: "-",
        fcm_id: "-",
        last_login: "",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_account: "532cba4e-6ce9-46cc-b49a-f37964d9f9e4",
        sname_user: "Bondan",
        lname_user: "Bondan Subaru",
        mobile: "081234567892",
        email: "bondan@mail.com",
        password: "pass12345",
        avatar: "foto.png",
        id_account_level: "1",
        role: "Karyawan",
        status_account: "ACT",
        token: "-",
        imei: "-",
        fcm_id: "-",
        last_login: "",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_account: "6d81400c-7128-11ee-ab30-d8bbc1cf618f",
        sname_user: "Putra",
        lname_user: "Putra Saputra",
        mobile: "081234567893",
        email: "saputra@mail.com",
        password: "pass12345",
        avatar: "foto.png",
        id_account_level: "1",
        role: "Karyawan",
        status_account: "ACT",
        token: "-",
        imei: "-",
        fcm_id: "-",
        last_login: "",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('account', null, {});
  }
};
