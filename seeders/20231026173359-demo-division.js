'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('division', [
      {
        id_division: '071f4322-2351-4ca6-85a6-abb6adcb53b2',
        division_sname: 'WMS',
        division_lname: 'Warehouse Management System',
        division_description: 'Divisi bagian manajemen gudang',
        status_division: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_division: 'bb285a6c-713a-11ee-ab30-d8bbc1cf618f',
        division_sname: 'DMS',
        division_lname: 'Distributor Management System',
        division_description: 'Divisi bagian manajemen distributor',
        status_division: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      },
      {
        id_division: '6e5aecbb-8259-404a-abbe-f496a5ebfded',
        division_sname: 'OTH',
        division_lname: 'Other Division',
        division_description: 'Divisi lain',
        status_division: "ACT",
        datetime_created: "0000-00-00 00:00:00",
        datetime_edited: "0000-00-00 00:00:00"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('division', null, {});
  }
};
