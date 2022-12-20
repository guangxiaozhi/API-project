'use strict';
const bcrypt = require("bcryptjs");
const {Op} = require('sequelize')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
const bookingSeeds = [
  {
    spotId:1,
    userId:1,
    startDate:'2022-01-17',
    endDate:'2022-01-20'
  },
  {
    spotId:2,
    userId:1,
    startDate:'2022-01-17',
    endDate:'2022-01-20'
  },
  {
    spotId:3,
    userId:2,
    startDate:'2022-01-17',
    endDate:'2022-01-20'
  },
  {
    spotId:4,
    userId:3,
    startDate:'2022-01-17',
    endDate:'2022-01-20'
  }

]
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Bookings';
    await queryInterface.bulkInsert(options,bookingSeeds);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options,{[Op.or]:bookingSeeds},{})
  }
};
