import React, { useState } from 'react';

const FeesManagement = () => {
    const [activeTab, setActiveTab] = useState('demands');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Fees Management</h1>
                <div className="flex space-x-2">
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'demands' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                        onClick={() => setActiveTab('demands')}
                    >
                        Fee Demands
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'payments' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}
                        onClick={() => setActiveTab('payments')}
                    >
                        Collection
                    </button>
                </div>
            </div>

            <div className="glass-panel overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between">
                    <div className="relative w-64">
                        <input type="text" placeholder="Search Student..." className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:border-indigo-500" />
                    </div>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                        + Create Demand
                    </button>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-slate-800 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-4">Student</th>
                            <th className="px-6 py-4">Fee Head</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Due Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700 text-slate-300 text-sm">
                        {[1, 2, 3].map((item) => (
                            <tr key={item} className="hover:bg-slate-800/50">
                                <td className="px-6 py-4 font-medium text-white">John Doe (ST-2023-00{item})</td>
                                <td className="px-6 py-4">Tuition Fee Term 1</td>
                                <td className="px-6 py-4">₹5,000.00</td>
                                <td className="px-6 py-4">2023-05-15</td>
                                <td className="px-6 py-4">
                                    <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs">Pending</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-indigo-400 hover:text-indigo-300">Collect</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeesManagement;
