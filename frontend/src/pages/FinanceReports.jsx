import React from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { FaCalendarAlt, FaDownload } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const FinanceReports = () => {

    const monthlyData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Income',
                data: [65000, 59000, 80000, 81000, 56000, 55000],
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
                borderColor: '#6366f1',
                borderWidth: 1,
            },
            {
                label: 'Expenses',
                data: [28000, 48000, 40000, 19000, 86000, 27000],
                backgroundColor: 'rgba(239, 68, 68, 0.5)',
                borderColor: '#ef4444',
                borderWidth: 1,
            },
        ],
    };

    const feeDistributionData = {
        labels: ['Tuition Fee', 'Transport', 'Hostel', 'Library', 'Exam'],
        datasets: [
            {
                label: '# of Votes',
                data: [45, 20, 15, 5, 15],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(236, 72, 153, 0.7)',
                    'rgba(6, 182, 212, 0.7)',
                ],
                borderColor: [
                    'rgba(99, 102, 241, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(236, 72, 153, 1)',
                    'rgba(6, 182, 212, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: '#94a3b8' }
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                ticks: { color: '#64748b' },
                grid: { color: '#334155' }
            },
            x: {
                ticks: { color: '#64748b' },
                grid: { color: '#334155' }
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Financial Reports</h1>
                    <p className="text-sm text-slate-400 mt-1">Detailed analysis of income, expenses, and operational costs.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg border border-slate-700">
                        <FaCalendarAlt /> This Year
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg">
                        <FaDownload /> Download PDF
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Income vs Expense Bar Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-panel p-6"
                >
                    <h3 className="text-lg font-semibold text-white mb-4">Income vs Expense Analytics</h3>
                    <Bar options={options} data={monthlyData} />
                </motion.div>

                {/* Fee Distribution Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="glass-panel p-6 flex flex-col items-center"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 self-start">Revenue Source Distribution</h3>
                    <div className="w-full max-w-xs">
                        <Pie data={feeDistributionData} />
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel p-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">Recent Financial Activities</h3>
                    </div>
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="text-xs uppercase bg-slate-800/50 text-slate-300">
                                <tr>
                                    <th className="px-6 py-3">Reference ID</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-slate-800/20 border-b border-slate-700/50 hover:bg-slate-800/40">
                                    <td className="px-6 py-4 font-mono text-indigo-400">#TRX-8859</td>
                                    <td className="px-6 py-4 font-medium text-white">Tuition Fee - Sem 1</td>
                                    <td className="px-6 py-4">2023-05-24</td>
                                    <td className="px-6 py-4 text-green-400">+₹1,200.00</td>
                                    <td className="px-6 py-4"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/20">Cleared</span></td>
                                </tr>
                                <tr className="bg-slate-800/20 border-b border-slate-700/50 hover:bg-slate-800/40">
                                    <td className="px-6 py-4 font-mono text-indigo-400">#TRX-8860</td>
                                    <td className="px-6 py-4 font-medium text-white">Vendor Payment - TechSol</td>
                                    <td className="px-6 py-4">2023-05-23</td>
                                    <td className="px-6 py-4 text-red-400">-₹450.00</td>
                                    <td className="px-6 py-4"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/20">Cleared</span></td>
                                </tr>
                                <tr className="bg-slate-800/20 hover:bg-slate-800/40">
                                    <td className="px-6 py-4 font-mono text-indigo-400">#TRX-8861</td>
                                    <td className="px-6 py-4 font-medium text-white">Salary - A. Smith</td>
                                    <td className="px-6 py-4">2023-05-20</td>
                                    <td className="px-6 py-4 text-red-400">-₹2,800.00</td>
                                    <td className="px-6 py-4"><span className="bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded-full text-xs border border-yellow-500/20">Pending</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default FinanceReports;
