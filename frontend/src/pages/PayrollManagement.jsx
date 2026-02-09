import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaFilter, FaDownload } from 'react-icons/fa';

const PayrollManagement = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [staffData, setStaffData] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/v1/payroll');
            const data = await response.json();
            setStaffData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching payroll:', error);
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Salary & Payroll Finance</h1>
                    <p className="text-sm text-slate-400 mt-1">Manage staff salaries, deductions, and payment processing.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg transition-colors border border-slate-700">
                        <FaDownload /> Export
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-lg shadow-indigo-500/20 transition-all hover:translate-y-[-2px]">
                        <FaPlus /> Process Payroll
                    </button>
                </div>
            </div>

            <div className="flex gap-4 border-b border-slate-700/50 pb-1">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'active' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                    Active Payroll
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'history' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
                >
                    Payment History
                </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search by name or emp ID..."
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 px-4 text-slate-300 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                    />
                </div>
                <div className="flex gap-3">
                    <select className="bg-slate-800/50 border border-slate-700 rounded-lg py-2.5 px-4 text-slate-300 focus:outline-none focus:border-indigo-500/50 cursor-pointer">
                        <option>All Departments</option>
                        <option>Academics</option>
                        <option>Administration</option>
                        <option>Transport</option>
                    </select>
                    <button className="p-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <FaFilter />
                    </button>
                </div>
            </div>

            <div className="glass-panel overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Employee</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Net Salary</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50 text-sm">
                        {Array.isArray(staffData) && staffData.length > 0 ? (
                            staffData.map((staff, index) => (
                                <motion.tr
                                    key={staff.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-slate-800/30 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
                                                {staff.name ? staff.name.charAt(0) : '?'}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-200">{staff.name}</p>
                                                <p className="text-xs text-slate-500">{staff.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">{staff.department}</td>
                                    <td className="px-6 py-4 text-slate-400">{staff.role}</td>
                                    <td className="px-6 py-4 font-medium text-slate-200">₹{staff.salary ? staff.salary.toFixed(2) : '0.00'}</td>
                                    <td className="px-6 py-4">
                                        {staff.status === 'Processed' ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                                Processed
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium">View Slip</button>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                                    {loading ? 'Loading payroll data...' : 'No payroll records found.'}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayrollManagement;
