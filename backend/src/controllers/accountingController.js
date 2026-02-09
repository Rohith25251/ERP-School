const { sequelize, Transaction, LedgerEntry, Account, Party } = require('../models');

exports.createTransaction = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const {
            party_id,
            amount,
            transaction_type,
            reference_type,
            reference_id,
            notes,
            debit_account_id,
            credit_account_id
        } = req.body;

        // 1. Create Transaction Record
        const newTransaction = await Transaction.create({
            party_id,
            amount,
            transaction_type,
            reference_type,
            reference_id,
            notes,
            status: 'COMPLETED'
        }, { transaction: t });

        // 2. Create Ledger Entries (Double Entry)

        // Debit Entry
        await LedgerEntry.create({
            transaction_id: newTransaction.transaction_id,
            account_id: debit_account_id,
            debit: amount,
            credit: 0.00
        }, { transaction: t });

        // Credit Entry
        await LedgerEntry.create({
            transaction_id: newTransaction.transaction_id,
            account_id: credit_account_id,
            debit: 0.00,
            credit: amount
        }, { transaction: t });

        await t.commit();

        res.status(201).json({
            success: true,
            message: 'Transaction created successfully',
            data: newTransaction
        });

    } catch (error) {
        await t.rollback();
        console.error('Transaction Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create transaction',
            error: error.message
        });
    }
};

exports.getLedger = async (req, res) => {
    try {
        const { account_id } = req.params;
        const entries = await LedgerEntry.findAll({
            where: { account_id },
            include: [
                {
                    model: Transaction,
                    include: [Party]
                },
                {
                    model: Account
                }
            ],
            order: [['created_at', 'DESC']]
        });

        res.status(200).json({ success: true, data: entries });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getTrialBalance = async (req, res) => {
    // Logic to aggregate all accounts and their debit/credit sums
    try {
        const accounts = await Account.findAll({
            include: [{
                model: LedgerEntry,
                attributes: ['debit', 'credit']
            }]
        });

        const trialBalance = accounts.map(acc => {
            const totalDebit = acc.LedgerEntries.reduce((sum, entry) => sum + parseFloat(entry.debit), 0);
            const totalCredit = acc.LedgerEntries.reduce((sum, entry) => sum + parseFloat(entry.credit), 0);
            return {
                account_name: acc.account_name,
                type: acc.account_type,
                debit: totalDebit,
                credit: totalCredit,
                balance: totalDebit - totalCredit
            };
        });

        res.status(200).json({ success: true, data: trialBalance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
