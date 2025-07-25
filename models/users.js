'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            // User.belongsToMany(models.Audition, {
            //   through: 'Users_Auditions',
            //   as: "Audition",
            //   foreignKey: "UserId"
            // });
        }
    }

    Users.init({
        login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
            validate: {
                isEmail: true
            }
        },
        phone:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        avatarUrl: DataTypes.STRING,
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        active_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize,
        modelName: 'Users',
        paranoid: true,
        timestamps: true,
        indexes: [
            { fields: ['email'], unique: true},
            { fields: ['phone'], unique: true}
        ]
    });

    return Users;
};