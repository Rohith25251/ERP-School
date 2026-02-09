const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LedgerEntry = sequelize.define('LedgerEntry', {
    ledger_entry_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    account_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    debit: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0.00
    },
    credit: {
        type: DataTypes.DECIMAL(15, 2),
        defaultValue: 0.00
    }
}, {
    tableName: 'ledger_entries',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = LedgerEntry;
