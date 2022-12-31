'use strict';
const bcrypt = require("bcryptjs");
const {Op} = require('sequelize')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviewImageSeed = [
  {
    id:1,
    reviewId:1,
    url:'sample.png'
  },
  {
    id:2,
    reviewId:2,
    url:'sample.png'
  },
  {
    id:3,
    reviewId:3,
    url:'sample2.png'
  },
  {
    id:4,
    reviewId:4,
    url:'sample.png'
  }
]
/** @type {import('sequelize-cli').Migration} */
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
   options.tableName = 'ReviewImages';
   await queryInterface.bulkInsert(options,reviewImageSeed)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options,{[Op.or]:reviewImageSeed},{})
  }
};
