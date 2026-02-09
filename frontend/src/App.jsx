import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import FeesManagement from './pages/FeesManagement';
import ExpenseEntry from './pages/ExpenseEntry';
import PayrollManagement from './pages/PayrollManagement';
import PurchaseManagement from './pages/PurchaseManagement';
import LedgerViewer from './pages/LedgerViewer';
import FinanceReports from './pages/FinanceReports';

function App() {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-900 text-white font-sans">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#0F172A] z-0"></div>
                <div className="absolute top-0 left-0 w-full h-96 bg-indigo-500/10 blur-[100px] z-0"></div>

                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 z-10 relative scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/fees" element={<FeesManagement />} />
                        <Route path="/expenses" element={<ExpenseEntry />} />
                        <Route path="/payroll" element={<PayrollManagement />} />
                        <Route path="/purchases" element={<PurchaseManagement />} />
                        <Route path="/ledger" element={<LedgerViewer />} />
                        <Route path="/reports" element={<FinanceReports />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;
