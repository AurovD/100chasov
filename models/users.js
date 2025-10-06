'use strict';
const { Model } = require('sequelize');
const FlakeId = require('flake-idgen');
// const { USER_ROLES } = require('../types/user');
const USER_ROLES = ['user', 'admin', 'moderator', 'superadmin'];

const flake = new FlakeId({ id: 1 });

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        // static associate(models) {
        //     Users.hasOne(models.UserRefreshTokens, {
        //         foreignKey: 'userId',
        //         as: 'refreshTokens'
        //     });
        // }
    }

    Users.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            // allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
            set(value) {
                this.setDataValue('email', value?.toLowerCase());
            },
            validate: { isEmail: true }
        },
        phone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        avatarUrl: DataTypes.STRING,
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        role: {
            type: DataTypes.ENUM(...USER_ROLES),
            defaultValue: 'user'
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        active_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        modelName: 'Users',
        // paranoid: true,
        timestamps: true,
        indexes: [
            { fields: ['email'], unique: true },
            { fields: ['phone'], unique: true }
        ],
        hooks: {
            beforeCreate: async (users) => {
                const idBuffer = flake.next();
                users.id = BigInt("0x" + idBuffer.toString("hex")).toString();
            }
        }
    });

    // Users.addHook('beforeCreate', (users, options) => {
    //     console.log("Method 2 via the .addHook() method");
    //     const flake = new FlakeId();
    //     const idBuffer = flake.next();
    //     users.id = "kjlhiu77f9"
    //     // user.id = BigInt('0x' + idBuffer.toString('hex')).toString();
    // });
    //
    // Users.beforeCreate(async (users, options) => {
    //     console.log("Method 3 via the direct method");
    //             const flake = new FlakeId();
    //             const idBuffer = flake.next();
    //             users.id = BigInt('0x' + idBuffer.toString('hex')).toString();
    // });

    return Users;
};

// https://sequelize.org/docs/v6/other-topics/migrations/