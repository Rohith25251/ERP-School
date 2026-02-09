const sequelize = require('../config/database');
const Party = require('./Party');
const Account = require('./Account');
const Transaction = require('./Transaction');
const LedgerEntry = require('./LedgerEntry');
const FeeDemand = require('./FeeDemand');
const FeePayment = require('./FeePayment');

const Payroll = require('./Payroll');
const Purchase = require('./Purchase');
const Expense = require('./Expense');
const ExpenseCategory = require('./ExpenseCategory');

// Associations

// Transaction -> Party
Transaction.belongsTo(Party, { foreignKey: 'party_id' });
Party.hasMany(Transaction, { foreignKey: 'party_id' });

// LedgerEntry -> Transaction
LedgerEntry.belongsTo(Transaction, { foreignKey: 'transaction_id' });
Transaction.hasMany(LedgerEntry, { foreignKey: 'transaction_id' });

// LedgerEntry -> Account
LedgerEntry.belongsTo(Account, { foreignKey: 'account_id' });
Account.hasMany(LedgerEntry, { foreignKey: 'account_id' });

// Account Self-Reference (Parent Account)
Account.belongsTo(Account, { as: 'ParentAccount', foreignKey: 'parent_account_id' });
Account.hasMany(Account, { as: 'SubAccounts', foreignKey: 'parent_account_id' });

// Fees
FeeDemand.belongsTo(Party, { foreignKey: 'party_id' });
Party.hasMany(FeeDemand, { foreignKey: 'party_id' });

FeePayment.belongsTo(FeeDemand, { foreignKey: 'fee_demand_id' });
FeeDemand.hasMany(FeePayment, { foreignKey: 'fee_demand_id' });

FeePayment.belongsTo(Transaction, { foreignKey: 'transaction_id' });
Transaction.hasOne(FeePayment, { foreignKey: 'transaction_id' });

// Payroll
Payroll.belongsTo(Party, { foreignKey: 'party_id' });
Party.hasMany(Payroll, { foreignKey: 'party_id' });

// Purchases
Purchase.belongsTo(Party, { foreignKey: 'party_id' });
Party.hasMany(Purchase, { foreignKey: 'party_id' });

// Expenses
Expense.belongsTo(ExpenseCategory, { foreignKey: 'category_id' });
ExpenseCategory.hasMany(Expense, { foreignKey: 'category_id' });

Expense.belongsTo(Transaction, { foreignKey: 'transaction_id' });
Transaction.hasOne(Expense, { foreignKey: 'transaction_id' });


module.exports = {
    sequelize,
    Party,
    Account,
    Transaction,
    LedgerEntry,
    FeeDemand,
    FeePayment,
    Payroll,
    Purchase,
    Expense,
    ExpenseCategory
};
