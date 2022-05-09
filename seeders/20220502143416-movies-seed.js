'use strict';

const fs = require('fs');

module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const data = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));

    for(let i = 0; i < data.length; i++){
      data[i].createdAt = new Date();
      data[i].updatedAt = new Date();
    }

    return queryInterface.bulkInsert('Movies', data, {});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('Movies', null, {});
  }
};
