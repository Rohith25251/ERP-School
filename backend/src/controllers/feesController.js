const { sequelize, FeeDemand, FeePayment, Transaction, LedgerEntry } = require('../models');

// Hardcoded Account IDs for demo - in real app, fetch from config/DB by name "Cash" or "Fee Income"
const CASH_ACCOUNT_ID = 1;
const FEE_INCOME_ACCOUNT_ID = 4; // Assuming 4 is an Income account

exports.createDemand = async (req, res) => {
    try {
        const demand = await FeeDemand.create(req.body);
        res.status(201).json({ success: true, data: demand });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.registerPayment = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { fee_demand_id, payment_mode, amount_paid, party_id } = req.body;

        // 1. Create Transaction Core (The Backbone)
        const newTransaction = await Transaction.create({
            party_id,
            amount: amount_paid,
            transaction_type: 'INCOME',
            reference_type: 'FEE_PAYMENT',
            status: 'COMPLETED',
            notes: `Fee Payment for Demand #${fee_demand_id} via ${payment_mode}`
        }, { transaction: t });

        // 2. Create Fee Payment Record linked to Transaction
        const payment = await FeePayment.create({
            fee_demand_id,
            transaction_id: newTransaction.transaction_id,
            payment_mode,
            amount_paid
        }, { transaction: t });

        // 3. Update Demand Status
        // Ideally check if fully paid, simplifies here
        await FeeDemand.update(
            { status: 'PAID' },
            { where: { fee_demand_id }, transaction: t }
        );

        // 4. Ledger Entries (The Architecture Requirement)

        // Debit -> Cash/Bank (Asset)
        await LedgerEntry.create({
            transaction_id: newTransaction.transaction_id,
            account_id: CASH_ACCOUNT_ID,
            debit: amount_paid,
            credit: 0.00
        }, { transaction: t });

        // Credit -> Fee Income (Income)
        await LedgerEntry.create({
            transaction_id: newTransaction.transaction_id,
            account_id: FEE_INCOME_ACCOUNT_ID,
            debit: 0.00,
            credit: amount_paid
        }, { transaction: t });

        await t.commit();

        res.status(201).json({
            success: true,
            data: {
                payment,
                transaction: newTransaction
            }
        });

    } catch (error) {
        await t.rollback();
        console.error('Payment Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
