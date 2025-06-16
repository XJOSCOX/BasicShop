const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
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
    imagePath: {
        type: DataTypes.STRING, // e.g., /uploads/product123.jpg
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
