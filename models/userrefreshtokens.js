'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRefreshTokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        UserRefreshTokens.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    }

  UserRefreshTokens.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      // allowNull: false
    },
    refreshToken: DataTypes.STRING,
    userId: {
      type: DataTypes.STRING,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'UserRefreshTokens',
    timestamps: true,
    indexes: [
      { fields: ['userId'], unique: true },
    ],
    hooks: {
      beforeCreate: async (userRefreshTokens) => {
        console.log("Method 1 via the .init() method");
        const idBuffer = flake.next();
        userRefreshTokens.id = BigInt("0x" + idBuffer.toString("hex")).toString();
      }
    }
  });
  return UserRefreshTokens;
};