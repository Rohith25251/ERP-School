const { Purchase, Party } = require('../models');

exports.getPurchaseList = async (req, res) => {
    try {
        const purchases = await Purchase.findAll({
            include: [{ model: Party, attributes: ['full_name'] }],
            order: [['purchase_date', 'DESC']]
        });

        const formatted = purchases.map(p => ({
            id: p.invoice_number || `PUR-${p.purchase_id}`,
            vendor: p.Party.full_name,
            items: p.items_description,
            amount: parseFloat(p.total_amount),
            date: p.purchase_date,
            status: p.status === 'RECEIVED' ? 'Pending' : p.status  // Map DB status to UI status expectations if needed
        }));

        res.json(formatted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
