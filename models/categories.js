'use strict';
const { Model } = require('sequelize');
const FlakeId = require('flake-idgen');
const {slugify} = require("../helpers/slugify");


const flake = new FlakeId({ id: 1 });

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.hasMany(models.Products, {
        foreignKey: 'category_id',
        as: 'products',
      });
      Categories.belongsTo(models.Categories, {
        foreignKey: 'parent_id',
        as: 'parent',
      });
      Categories.hasMany(models.Categories, {
        foreignKey: 'parent_id',
        as: 'children',
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
      { fields: ['parent_id', 'title'], unique: true },
    ],
    hooks: {
      beforeCreate: async (categories) => {
        if (!categories.id) {
          const idBuffer = flake.next();
          categories.id = BigInt("0x" + idBuffer.toString("hex")).toString();
        }

          const slug = slugify(categories.title);

          categories.link = `${slug}-${categories.id}`;
      }
    }
  });

  return Categories;
};

// https://sequelize.org/docs/v6/other-topics/migrations/
