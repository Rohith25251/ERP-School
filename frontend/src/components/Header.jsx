import React from 'react';
import { FaBell, FaSearch } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-700/50 flex items-center justify-between px-8 z-10 sticky top-0">
            <div className="flex items-center">
                <h2 className="text-lg font-medium text-slate-200 border-l-4 border-indigo-500 pl-3">
                    Academic Year <span className="text-white font-bold">2025-2026</span>
                    <span className="ml-3 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">Active</span>
                </h2>
            </div>

            <div className="flex items-center space-x-6">
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        className="bg-slate-800 text-sm text-slate-300 rounded-full px-4 py-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-slate-700"
                    />
                    <FaSearch className="absolute left-3 top-2.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </div>

                <button className="relative text-slate-400 hover:text-white transition-colors">
                    <FaBell className="text-xl" />
                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-slate-900"></span>
                </button>

                <button className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">
                    + New Transaction
                </button>
            </div>
        </header>
    );
};

export default Header;
