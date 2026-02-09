const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Purchase = sequelize.define('Purchase', {
    purchase_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    party_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    invoice_number: {
        type: DataTypes.STRING,
    },
    items_description: {
        type: DataTypes.TEXT,
    },
    total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    purchase_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('ORDERED', 'RECEIVED', 'PAID'),
        defaultValue: 'ORDERED'
    }
}, {
    tableName: 'purchases',
    timestamps: false
});

module.exports = Purchase;
