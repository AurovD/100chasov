// models/Verification.ts
import { DataTypes, Model, Sequelize } from 'sequelize';

module.exports =  (sequelize, DataTypes) => {
  class Verifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }

  Verifications.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    codeHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attemptsLeft: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    sequelize,
    modelName: 'Verifications',
    timestamps: true,
    // paranoid: true,
    indexes: [
      { fields: ['id'], unique: true},
      { fields: ['phone'], unique: true}
    ]
  });

  return Verifications;
};
