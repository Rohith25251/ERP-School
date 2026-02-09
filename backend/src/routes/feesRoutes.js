const express = require('express');
const router = express.Router();
const feesController = require('../controllers/feesController');

router.post('/demand', feesController.createDemand);
router.post('/payment', feesController.registerPayment);

module.exports = router;
