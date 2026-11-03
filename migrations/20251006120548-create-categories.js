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
    await queryInterface.createTable('Categories', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      link: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
      },
      parent_id: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
                    model: "Categories",
                    key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};