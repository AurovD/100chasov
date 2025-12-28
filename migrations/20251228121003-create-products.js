'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
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
        unique: true,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
      },
      count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      category_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Categories",
          key: 'id'
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      },
      images: {
        type: Sequelize.JSON,
        defaultValue: []
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};