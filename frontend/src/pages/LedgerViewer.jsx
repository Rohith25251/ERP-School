import React, { useState } from 'react';

const LedgerViewer = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">General Ledger Viewer</h1>

            <div className="glass-panel p-6">
                <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-400 mb-1">Select Account</label>
                        <select className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 px-4 text-white">
                            <option>Cash in Hand</option>
                            <option>HDFC Bank</option>
                            <option>Tuition Fee Income</option>
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-400 mb-1">From Date</label>
                        <input type="date" className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 px-4 text-white" />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-400 mb-1">To Date</label>
                        <input type="date" className="w-full bg-slate-800 border border-slate-600 rounded-lg py-2 px-4 text-white" />
                    </div>
                    <div className="flex items-end">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">View</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border border-slate-700">
                        <thead className="bg-slate-800 text-slate-400 text-xs uppercase">
                            <tr>
                                <th className="px-4 py-3 border-r border-slate-700">Date</th>
                                <th className="px-4 py-3 border-r border-slate-700">Transaction ID</th>
                                <th className="px-4 py-3 border-r border-slate-700">Particulars (Narrative)</th>
                                <th className="px-4 py-3 border-r border-slate-700 text-right">Debit</th>
                                <th className="px-4 py-3 border-r border-slate-700 text-right">Credit</th>
                                <th className="px-4 py-3 text-right">Balance</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700 text-slate-300 text-sm">
                            <tr className="bg-slate-800/20">
                                <td className="px-4 py-3 font-mono">2023-04-01</td>
                                <td className="px-4 py-3">-</td>
                                <td className="px-4 py-3 font-semibold">Opening Balance</td>
                                <td className="px-4 py-3 text-right">-</td>
                                <td className="px-4 py-3 text-right">-</td>
                                <td className="px-4 py-3 text-right font-bold text-white">10,000.00</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono">2023-04-05</td>
                                <td className="px-4 py-3 text-blue-400">#TXN-1025</td>
                                <td className="px-4 py-3">Fee Collection - Class 10A</td>
                                <td className="px-4 py-3 text-right text-green-400">5,000.00</td>
                                <td className="px-4 py-3 text-right">-</td>
                                <td className="px-4 py-3 text-right font-bold text-white">15,000.00</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-mono">2023-04-06</td>
                                <td className="px-4 py-3 text-blue-400">#TXN-1029</td>
                                <td className="px-4 py-3">Expense - Office Stationery</td>
                                <td className="px-4 py-3 text-right">-</td>
                                <td className="px-4 py-3 text-right text-red-400">500.00</td>
                                <td className="px-4 py-3 text-right font-bold text-white">14,500.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LedgerViewer;
