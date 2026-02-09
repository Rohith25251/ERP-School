const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const accountingRoutes = require('./routes/accountingRoutes');
const feesRoutes = require('./routes/feesRoutes');
const payrollRoutes = require('./routes/payrollRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/accounting', accountingRoutes);
app.use('/api/v1/fees', feesRoutes);
app.use('/api/v1/payroll', payrollRoutes);
app.use('/api/v1/purchases', purchaseRoutes);
app.use('/api/v1/expenses', expenseRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', service: 'Finance Core' });
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
});

module.exports = app;
