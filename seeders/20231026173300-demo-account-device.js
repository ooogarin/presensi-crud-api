'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('account_device', [
      {
        id_device_account: "155a7e9a-5ead-4f3d-9102-9e3b247b0312",
        imei: "imei 1",
        manufacture: "manufacture 1",
        model: "model 1",
        release_vesion: "0.0.1",
        sdk_version: "0.0.1",
        app_version: "0.0.1",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_device_account: "d808d253-9ac3-4d34-ab8b-42a9a5f98db7",
        imei: "imei 2",
        manufacture: "manufacture 2",
        model: "model 2",
        release_vesion: "0.0.2",
        sdk_version: "0.0.2",
        app_version: "0.0.2",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_device_account: "044baf57-f312-4307-ab6d-0636748a14b4",
        imei: "imei 3",
        manufacture: "manufacture 3",
        model: "model 3",
        release_vesion: "0.0.3",
        sdk_version: "0.0.3",
        app_version: "0.0.3",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('account_device', null, {});
  }
};
