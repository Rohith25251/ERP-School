import React from 'react';
import { motion } from 'framer-motion';
import { FaMoneyBillWave, FaChartLine, FaExclamationCircle, FaUsers, FaFileInvoiceDollar } from 'react-icons/fa';

const StatCard = ({ title, value, change, color, icon }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-panel p-6 relative overflow-hidden group"
    >
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            {icon}
        </div>
        <h3 className="text-sm font-medium text-slate-400 relative z-10">{title}</h3>
        <div className="mt-2 flex items-baseline relative z-10">
            <p className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">{value}</p>
            <span className={`ml-2 text-sm font-medium ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {change}
            </span>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
        >
            {/* 1. Header Stats covering the main financial pillars */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Fees Management */}
                <motion.div variants={item}><StatCard title="Fees Collection (YTD)" value="₹1,245,200" change="+8.5%" color="text-indigo-500" icon={<FaMoneyBillWave size={40} />} /></motion.div>

                {/* Expenses Management */}
                <motion.div variants={item}><StatCard title="Total Expenses" value="₹425,430" change="+4.2%" color="text-red-500" icon={<FaChartLine size={40} />} /></motion.div>

                {/* Salary & Payroll */}
                <motion.div variants={item}><StatCard title="Payroll Processed" value="₹380,000" change="+1.2%" color="text-green-500" icon={<FaUsers size={40} />} /></motion.div>

                {/* Purchases & Vendors */}
                <motion.div variants={item}><StatCard title="Vendor Payables" value="₹32,000" change="-2.1%" color="text-yellow-500" icon={<FaExclamationCircle size={40} />} /></motion.div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Quick Actions / Links to Modules */}
                <motion.div variants={item} className="glass-panel p-6 lg:col-span-1">
                    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-700/50 group">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                    <FaMoneyBillWave />
                                </div>
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">Collect Fees</span>
                            </div>
                            <span className="text-slate-500 text-xs">→</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-700/50 group">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-red-500/10 text-red-400 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors">
                                    <FaFileInvoiceDollar />
                                </div>
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">Record Expense</span>
                            </div>
                            <span className="text-slate-500 text-xs">→</span>
                        </button>
                        <button className="w-full flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-colors border border-slate-700/50 group">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-green-500/10 text-green-400 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-colors">
                                    <FaUsers />
                                </div>
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">Run Payroll</span>
                            </div>
                            <span className="text-slate-500 text-xs">→</span>
                        </button>
                    </div>
                </motion.div>

                {/* Collection Status */}
                <motion.div variants={item} className="glass-panel p-6 lg:col-span-2">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                        <span className="w-2 h-6 bg-indigo-500 rounded-full mr-3"></span>
                        Fee Collection Ratio
                    </h3>
                    <div className="space-y-6 mt-4">
                        <div>
                            <div className="flex justify-between text-sm text-slate-300 mb-2">
                                <span className="font-semibold">Tuition Fees (Class 1-10)</span>
                                <span className="text-indigo-400 font-bold">85% <span className="text-slate-500 font-normal">(₹850k / ₹1M)</span></span>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '85%' }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-3 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                                ></motion.div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm text-slate-300 mb-2">
                                <span className="font-semibold">Transport Fees</span>
                                <span className="text-yellow-400 font-bold">62% <span className="text-slate-500 font-normal">(₹120k / ₹195k)</span></span>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '62%' }}
                                    transition={{ duration: 1, delay: 0.7 }}
                                    className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-3 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]"
                                ></motion.div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm text-slate-300 mb-2">
                                <span className="font-semibold">Hostel Fees</span>
                                <span className="text-green-400 font-bold">92% <span className="text-slate-500 font-normal">(₹275k / ₹300k)</span></span>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '92%' }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                    className="bg-gradient-to-r from-green-600 to-green-400 h-3 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                                ></motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
