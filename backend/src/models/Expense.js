const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Expense = sequelize.define('Expense', {
    expense_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    payee_name: {
        type: DataTypes.STRING(100),
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    expense_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'APPROVED', 'PAID'),
        defaultValue: 'PENDING'
    }
}, {
    tableName: 'expenses',
    timestamps: false
});

module.exports = Expense;
