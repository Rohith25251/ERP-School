const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const schemaPath = path.join(__dirname, '../../../database/schema.sql');

async function runSchema() {
    try {
        const sql = fs.readFileSync(schemaPath, 'utf8');

        // Create connection without DB to create it if needed
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            multipleStatements: true
        });

        console.log('Running schema migration...');
        await connection.query(sql);
        console.log('✅ Schema applied and seed data inserted successfully.');
        await connection.end();
    } catch (error) {
        console.error('❌ Error executing schema:', error);
    }
}

runSchema();
