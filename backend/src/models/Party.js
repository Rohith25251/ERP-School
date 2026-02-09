const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Party = sequelize.define('Party', {
    party_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    party_type: {
        type: DataTypes.ENUM('STUDENT', 'STAFF', 'VENDOR'),
        allowNull: false
    },
    reference_id: {
        type: DataTypes.STRING(50)
    },
    full_name: {
        type: DataTypes.STRING(100)
    },
    department: {
        type: DataTypes.STRING(50)
    },
    email: {
        type: DataTypes.STRING(100)
    },
    phone: {
        type: DataTypes.STRING(20)
    }
}, {
    tableName: 'parties',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = Party;
