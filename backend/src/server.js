const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Test Database Connection
        await sequelize.authenticate();
        console.log('✅ Database connected successfully.');

        // Sync Models (Use { force: true } only for dev to recreate tables, otherwise { alter: true } or migrations)
        // For this demo generation, we just sync. Since we manually created the schema, we avoid 'alter: true' to prevent timestamp errors.
        await sequelize.sync();
        console.log('✅ Database models synced.');

        app.listen(PORT, () => {
            console.log(`🚀 Finance Core Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
}

startServer();
