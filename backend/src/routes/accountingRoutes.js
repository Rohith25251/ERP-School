const express = require('express');
const router = express.Router();
const accountingController = require('../controllers/accountingController');

router.post('/transactions', accountingController.createTransaction);
router.get('/ledger/:account_id', accountingController.getLedger);
router.get('/trial-balance', accountingController.getTrialBalance);

module.exports = router;
