'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.addColumn('Categories', 'link', {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //   unique: true,
    //   defaultValue: '',
    // });
    // await queryInterface.createTable('Categories', {
    //   id: {
    //     type: Sequelize.STRING,
    //     primaryKey: true,
    //     allowNull: false
    //   },
    //   title: {
    //     type: Sequelize.STRING,
    //     unique: true,
    //     allowNull: false
    //   },
    //   parent_id: {
    //     type: Sequelize.STRING,
    //     allowNull: true
    //   }
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};