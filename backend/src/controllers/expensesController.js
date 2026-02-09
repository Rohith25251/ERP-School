const { Expense, ExpenseCategory } = require('../models');

exports.createExpense = async (req, res) => {
    try {
        const { category_id, payee_name, amount, expense_date, description } = req.body;

        // 1. Create Expense Record
        const expense = await Expense.create({
            category_id,
            payee_name,
            amount,
            expense_date,
            description,
            status: 'PENDING'
        });

        res.status(201).json({ message: 'Expense recorded successfully', expense });
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll({
            include: [{ model: ExpenseCategory, attributes: ['name'] }],
            order: [['expense_date', 'DESC']]
        });
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await ExpenseCategory.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
