const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Codes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        }
    };

    Codes.init({
        phone: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        temporary_token: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: 'Codes',
        timestamps: true,
      // paranoid: true,
      indexes: [
        { fields: ['code'], unique: true},
        { fields: ['phone'], unique: true}
      ]
    });

    return Codes;
};