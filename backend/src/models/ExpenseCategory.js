const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ExpenseCategory = sequelize.define('ExpenseCategory', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    type: {
        type: DataTypes.ENUM('UTILITIES', 'EVENTS', 'MAINTENANCE', 'OPERATIONAL'),
        allowNull: false
    }
}, {
    tableName: 'expense_categories',
    timestamps: false
});

module.exports = ExpenseCategory;
