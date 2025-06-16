// backend/models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    category: {
        type: DataTypes.STRING,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    isPerishable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    image: {
        type: DataTypes.STRING, // renamed from imagePath
        defaultValue: '',
    },
    quantitySold: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
});

module.exports = Product;
