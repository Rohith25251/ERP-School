import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChartPie, FaMoneyBillWave, FaFileInvoiceDollar, FaBook, FaUsers, FaShoppingCart, FaChartBar, FaUniversity } from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/', label: 'Dashboard', icon: <FaChartPie /> },
        { path: '/fees', label: 'Fees Management', icon: <FaMoneyBillWave /> },
        { path: '/expenses', label: 'Expenses Management', icon: <FaFileInvoiceDollar /> },
        { path: '/payroll', label: 'Salary & Payroll', icon: <FaUsers /> },
        { path: '/purchases', label: 'Purchases & Vendors', icon: <FaShoppingCart /> },
        { path: '/ledger', label: 'Accounting & Ledger', icon: <FaBook /> },
        { path: '/reports', label: 'Finance Reports', icon: <FaChartBar /> },
    ];

    return (
        <div className="w-72 bg-slate-900 border-r border-slate-700/50 flex flex-col relative z-20 shadow-2xl font-sans">
            <div className="h-24 flex items-center px-6 border-b border-slate-700/50">
                <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg shadow-indigo-500/20">
                        <FaUniversity className="text-white text-xl" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-wide leading-tight">ABC</h1>
                        <p className="text-xs text-indigo-400 font-medium tracking-wider">FINANCE CORE</p>
                    </div>
                </div>
            </div>

            <div className="px-4 py-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Main Menu</p>
                <nav className="space-y-1">
                    <ul>
                        {menuItems.map((item) => (
                            <li key={item.path} className="mb-2">
                                <Link
                                    to={item.path}
                                    className="relative block group"
                                >
                                    {location.pathname === item.path && (
                                        <div
                                            className="absolute inset-0 bg-indigo-600/10 rounded-xl"
                                            style={{ zIndex: 0 }}
                                        />
                                    )}
                                    <div className={`relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${location.pathname === item.path
                                            ? 'text-indigo-400 translate-x-1'
                                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 hover:translate-x-1'
                                        }`}>
                                        <span className={`mr-3 text-lg ${location.pathname === item.path ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400 transition-colors'}`}>
                                            {item.icon}
                                        </span>
                                        {item.label}

                                        {location.pathname === item.path && (
                                            <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="mt-auto p-4 border-t border-slate-700/50">
                <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-xl p-4 flex items-center space-x-3 border border-slate-700/50">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold text-white shadow-md">
                        FA
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">Finance Admin</p>
                        <p className="text-xs text-slate-400 truncate">admin@school.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
