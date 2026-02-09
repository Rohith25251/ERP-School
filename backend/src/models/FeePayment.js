const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FeePayment = sequelize.define('FeePayment', {
    payment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fee_demand_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    payment_mode: {
        type: DataTypes.ENUM('CASH', 'CHEQUE', 'ONLINE', 'BANK_TRANSFER'),
        allowNull: false
    },
    amount_paid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    paid_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'fee_payments',
    timestamps: false
});

module.exports = FeePayment;
