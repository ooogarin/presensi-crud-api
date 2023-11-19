'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('attendance', [
      {
        id_attendance: "2c39e1c3-db7e-4a78-8a6a-2ab41f80145e",
        id_account: "2c39e1c3-db7e-4a78-8a6a-2ab41f80145e",
        id_schedule: "4024baff-5f82-4564-a242-0ae2fbfcea9f",
        event_name: "LOGIN",
        locator_code: "locator-code",
        locator_latitude: "-",
        locator_longitude: "-",
        selfie: "-",
        latitude: "-",
        longitude: "-",
        reason: "attendance-reason",
        attendance_start: "00:00:00",
        attendance_finish: "00:00:00",
        status_attendance: "-",
        date_attend: "0000-00-00 00:00:00",
        datetime_record: "0000-00-00 00:00:00",
        datetime_created: "0000-00-00 00:00:00"
      },
      {
        id_attendance: "2edc534b-8dbb-4137-a6d1-fd4dd26e7510",
        id_account: "2edc534b-8dbb-4137-a6d1-fd4dd26e7510",
        id_schedule: "aeed1e5d-e344-4112-a602-50b3bce9c618",
        event_name: "LOGIN",
        locator_code: "locator-code",
        locator_latitude: "-",
        locator_longitude: "-",
        selfie: "-",
        latitude: "-",
        longitude: "-",
        reason: "attendance-reason",
        attendance_start: "00:00:00",
        attendance_finish: "00:00:00",
        status_attendance: "-",
        date_attend: "0000-00-00 00:00:00",
        datetime_record: "0000-00-00 00:00:00",
        datetime_created: "0000-00-00 00:00:00"
      },
      {
        id_attendance: "532cba4e-6ce9-46cc-b49a-f37964d9f9e4",
        id_account: "532cba4e-6ce9-46cc-b49a-f37964d9f9e4",
        id_schedule: "87c4f087-7d21-4fff-8995-c31d2dac54e8",
        event_name: "LOGIN",
        locator_code: "locator-code",
        locator_latitude: "-",
        locator_longitude: "-",
        selfie: "-",
        latitude: "-",
        longitude: "-",
        reason: "attendance-reason",
        attendance_start: "00:00:00",
        attendance_finish: "00:00:00",
        status_attendance: "-",
        date_attend: "0000-00-00 00:00:00",
        datetime_record: "0000-00-00 00:00:00",
        datetime_created: "0000-00-00 00:00:00"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('attendance', null, {});
  }
};
