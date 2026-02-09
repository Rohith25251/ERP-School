const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FeeDemand = sequelize.define('FeeDemand', {
    fee_demand_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    party_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'PARTIAL', 'PAID', 'OVERDUE'),
        defaultValue: 'PENDING'
    }
}, {
    tableName: 'fee_demands',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = FeeDemand;
