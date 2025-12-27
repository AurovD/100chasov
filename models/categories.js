'use strict';
const { Model } = require('sequelize');
const FlakeId = require('flake-idgen');


const flake = new FlakeId({ id: 1 });

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    // static associate(models) {
    //     Users.hasOne(models.UserRefreshTokens, {
    //         foreignKey: 'userId',
    //         as: 'refreshTokens'
    //     });
    // }
  }

  Categories.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      // allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    parent_id: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Categories',
    // paranoid: true,
    timestamps: false,
    indexes: [
      // { fields: ['email'], unique: true },
      // { fields: ['phone'], unique: true }
    ],
    hooks: {
      beforeCreate: async (categories) => {
        const idBuffer = flake.next();
        categories.id = BigInt("0x" + idBuffer.toString("hex")).toString();
      }
    }
  });

  return Categories;
};

// https://sequelize.org/docs/v6/other-topics/migrations/