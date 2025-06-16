const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    phone: {
        type: DataTypes.STRING,
    },

    address: {
        type: DataTypes.STRING,
    },

    city: {
        type: DataTypes.STRING,
    },

    state: {
        type: DataTypes.STRING,
    },

    country: {
        type: DataTypes.STRING,
    },

    postalCode: {
        type: DataTypes.STRING,
    },

    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    },

}, {
    timestamps: true,
});

module.exports = User;
