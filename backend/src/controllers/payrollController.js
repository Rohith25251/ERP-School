const { Payroll, Party, sequelize } = require('../models');

exports.getPayrollList = async (req, res) => {
    try {
        const payrolls = await Payroll.findAll({
            include: [{ model: Party, attributes: ['full_name', 'department', 'reference_id'] }],
            order: [['year', 'DESC'], ['month', 'DESC']]
        });

        // Transform data for UI
        const formatted = payrolls.map(p => ({
            id: p.party_id,
            name: p.Party.full_name,
            role: p.Party.department || 'Staff', // Using department as role for now
            department: p.Party.department,
            salary: parseFloat(p.basic_salary),
            status: p.status === 'PAID' ? 'Processed' : p.status === 'GENERATED' ? 'Pending' : p.status,
            month: p.month
        }));

        res.json(formatted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.generatePayroll = async (req, res) => {
    // Placeholder for logic to generate payroll for a month
    res.json({ message: 'Payroll generation started' });
};
