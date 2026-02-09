import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaFilter, FaFileInvoice } from 'react-icons/fa';

const PurchaseManagement = () => {
    const [purchaseData, setPurchaseData] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/v1/purchases');
            const data = await response.json();
            setPurchaseData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching purchases:', error);
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Purchases & Vendor Payments</h1>
                    <p className="text-sm text-slate-400 mt-1">Track inventory purchases and manage vendor payments.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-lg shadow-indigo-500/20 transition-all hover:translate-y-[-2px]">
                    <FaPlus /> New Purchase
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-panel p-5">
                    <p className="text-slate-400 text-sm">Total Payables (Month)</p>
                    <p className="text-2xl font-bold text-white mt-1">₹45,200.00</p>
                    <div className="w-full bg-slate-700/50 h-1.5 mt-3 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full w-[45%]"></div>
                    </div>
                </div>
                <div className="glass-panel p-5">
                    <p className="text-slate-400 text-sm">Approvals Pending</p>
                    <p className="text-2xl font-bold text-white mt-1">12 Invoices</p>
                    <div className="w-full bg-slate-700/50 h-1.5 mt-3 rounded-full overflow-hidden">
                        <div className="bg-yellow-500 h-full w-[30%]"></div>
                    </div>
                </div>
                <div className="glass-panel p-5">
                    <p className="text-slate-400 text-sm">Vendors Active</p>
                    <p className="text-2xl font-bold text-white mt-1">45 Partners</p>
                    <div className="w-full bg-slate-700/50 h-1.5 mt-3 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full w-[70%]"></div>
                    </div>
                </div>
            </div>

            <div className="glass-panel overflow-hidden">
                <div className="p-4 border-b border-slate-700/50 flex justify-between items-center">
                    <h3 className="font-semibold text-white">Recent Invoices</h3>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Search invoices..."
                            className="bg-slate-800/50 border border-slate-700 rounded-lg py-1.5 px-3 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/50"
                        />
                        <button className="p-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 hover:text-white">
                            <FaFilter size={14} />
                        </button>
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Invoice ID</th>
                            <th className="px-6 py-4">Vendor</th>
                            <th className="px-6 py-4">Items / Service</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50 text-sm">
                        {purchaseData.map((item, index) => (
                            <motion.tr
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="hover:bg-slate-800/30 transition-colors"
                            >
                                <td className="px-6 py-4 font-mono text-indigo-400">{item.id}</td>
                                <td className="px-6 py-4 font-medium text-slate-200">{item.vendor}</td>
                                <td className="px-6 py-4 text-slate-400">{item.items}</td>
                                <td className="px-6 py-4 text-slate-400">{item.date}</td>
                                <td className="px-6 py-4 font-medium text-slate-200">₹{item.amount.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${item.status === 'Paid' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        item.status === 'Pending' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                            'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-white transition-colors"><FaFileInvoice /></button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PurchaseManagement;
