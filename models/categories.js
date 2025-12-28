'use strict';
const { Model } = require('sequelize');
const FlakeId = require('flake-idgen');


const flake = new FlakeId({ id: 1 });

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.hasMany(models.Products, {
        foreignKey: 'category_id',
        as: 'products',
      });
    }
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
      // allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      unique: true,
      // allowNull: false
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
      { fields: ['link'], unique: true },
      { fields: ['title'], unique: true },
      { fields: ['parent_id']},
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