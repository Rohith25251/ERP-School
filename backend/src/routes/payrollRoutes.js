const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payrollController');

router.get('/', payrollController.getPayrollList);
router.post('/generate', payrollController.generatePayroll);

module.exports = router;
