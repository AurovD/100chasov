/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      login: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
        validate: {
          isEmail: true
        }
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
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      active_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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

    await queryInterface.addIndex('Users', ['email'], { unique: true });
    await queryInterface.addIndex('Users', ['phone'], { unique: true });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
