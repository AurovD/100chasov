'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Products.belongsTo(models.Categories, {
        foreignKey: 'category_id',
        as: 'category',
      });
    }
  }
  Products.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
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
    description: {
      type: DataTypes.STRING,
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    category_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ean: {
      type: DataTypes.STRING,
      allowNull: false
    },
    images: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  }, {
    sequelize,
    modelName: 'Products',
    timestamps: false,
    indexes: [
      { fields: ['category_id'] },
      { fields: ['link'], unique: true },
      { fields: ['title'], unique: true },
    ],
    hooks: {
      beforeCreate: async (products) => {
        const idBuffer = flake.next();
        products.id = BigInt("0x" + idBuffer.toString("hex")).toString();
      }
    }
  });
  return Products;
};