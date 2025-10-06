/** @type {import('sequelize-cli').Migration} */
// const { USER_ROLES } = require('../types/user');
const USER_ROLES = ['user', 'admin', 'moderator', 'superadmin'];

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      login: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      avatarUrl: {
        type: Sequelize.STRING
      },
      count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      role: {
        type: Sequelize.ENUM(...USER_ROLES),
        defaultValue: 'user'
      },
      permissions: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      active_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isBanned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });

    // await queryInterface.addIndex('Users', ['email'], { unique: true });
    // await queryInterface.addIndex('Users', ['phone'], { unique: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
    // await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Users_role";');
  }
};