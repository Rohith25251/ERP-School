# CopterCode School ERP - Finance Core (Backbone)

This is the implementation of Layer 7 (Finance Core) for the CopterCode School ERP.
It is designed as a modular, scalable system with a distinct separation of concerns between the API (Node.js/Express) and the Frontend (React).

## 🏗 Architecture

### 1. Database Layer (MySQL)
- **Schema**: 3NF Normalized schema.
- **Double Entry Ledger**: Implemented in `ledger_entries` table. Every `transaction` creates at least two ledger entries (Debit & Credit).
- **Core Entities**: `transactions`, `ledger_entries`, `accounts`, `fee_demands`, `fee_payments`.

### 2. Backend Layer (Node.js + Express + Sequelize)
- **Service-Repository Pattern**: Logic encapsulated in controllers (acting as service layer) and Models (Repo).
- **Transaction Safety**: All financial operations use database ACID transactions (`sequelize.transaction`).
- **API Structure**:
  - `/api/v1/accounting` - Core ledger operations.
  - `/api/v1/fees` - Fee demand and payment operations.

### 3. Frontend Layer (React + Vite + Tailwind)
- **Modern UI**: Dark mode, Glassmorphism, Responsive.
- **Modules**: Dashboard, Fee Management, Expense Entry, General Ledger Viewer.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js & NPM
- MySQL Server

### 1. Database Setup
1. Create a MySQL database named `school_erp_finance`.
2. Run the schema script located at `database/schema.sql`.
   ```sql
   source datbase/schema.sql;
   ```
3. (Optional) The backend will attempt to sync models automatically on start.

### 2. Backend Setup
1. Navigate to `backend` directory.
2. Install dependencies (if not already installed).
   ```bash
   cd backend
   npm install
   ```
3. Configure `.env` (create file `backend/.env`):
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=yourpassword
   DB_NAME=school_erp_finance
   PORT=3000
   ```
4. Start the server.
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to `frontend` directory.
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server.
   ```bash
   npm run dev
   ```
3. Open `http://127.0.0.1:5173` to view the application.

---

## 🧩 Modules Implemented

- **Fees Management**: Create demands, accept payments (Updates Ledger automatically).
- **Expenses**: Record expenses (Dr Expense, Cr Cash).
- **General Ledger**: View account history and balances.
- **Dashboard**: Real-time financial overview.

