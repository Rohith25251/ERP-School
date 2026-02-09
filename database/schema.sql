-- Database Schema for CopterCode School ERP - Layer 7 Finance Core
-- Database: school_erp_finance

DROP DATABASE IF EXISTS school_erp_finance;
CREATE DATABASE school_erp_finance;
USE school_erp_finance;

-- --------------------------------------------------------
-- 1. MASTER TABLES
-- --------------------------------------------------------

-- Academic Years
CREATE TABLE academic_years (
    academic_year_id INT AUTO_INCREMENT PRIMARY KEY,
    year_name VARCHAR(20) NOT NULL UNIQUE COMMENT 'e.g. 2023-2024',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE
);

-- Chart of Accounts (The Backbone)
CREATE TABLE accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    account_name VARCHAR(100) NOT NULL,
    account_type ENUM('ASSET', 'LIABILITY', 'EQUITY', 'INCOME', 'EXPENSE') NOT NULL,
    parent_account_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_account_id) REFERENCES accounts(account_id)
);

-- Parties (Students, Staff, Vendors) - Centralized Entity
CREATE TABLE parties (
    party_id INT AUTO_INCREMENT PRIMARY KEY,
    party_type ENUM('STUDENT', 'STAFF', 'VENDOR') NOT NULL,
    reference_id VARCHAR(50) COMMENT 'Student ID / Emp ID / Vendor Code',
    full_name VARCHAR(100) NOT NULL,
    department VARCHAR(50) COMMENT 'For Staff: Teaching/Non-Teaching/Admin',
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- 2. FINANCIAL CORE (LEDGER & TRANSACTIONS)
-- --------------------------------------------------------

-- Transactions (Central Event)
CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    party_id INT,
    amount DECIMAL(15, 2) NOT NULL,
    transaction_type ENUM('INCOME', 'EXPENSE', 'TRANSFER') NOT NULL,
    reference_type ENUM('FEE_PAYMENT', 'EXPENSE', 'PAYROLL', 'PURCHASE', 'MANUAL') NOT NULL,
    reference_id INT COMMENT 'ID of the related record',
    transaction_date DATE DEFAULT (CURRENT_DATE),
    description TEXT,
    status ENUM('PENDING', 'COMPLETED', 'CANCELLED') DEFAULT 'COMPLETED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (party_id) REFERENCES parties(party_id)
);

-- Ledger Entries (Double Entry System)
CREATE TABLE ledger_entries (
    ledger_entry_id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT NOT NULL,
    account_id INT NOT NULL,
    debit DECIMAL(15, 2) DEFAULT 0.00,
    credit DECIMAL(15, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

-- --------------------------------------------------------
-- 3. MODULE SPECIFIC TABLES
-- --------------------------------------------------------

-- 3.1 FEES MANAGEMENT (Tuition, Admission, Hostel, Transport)
CREATE TABLE fee_heads (
    fee_head_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category ENUM('TUITION', 'ADMISSION', 'HOSTEL', 'TRANSPORT', 'OTHER') NOT NULL
);

CREATE TABLE fee_demands (
    fee_demand_id INT AUTO_INCREMENT PRIMARY KEY,
    party_id INT NOT NULL COMMENT 'Student',
    fee_head_id INT NOT NULL,
    academic_year_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    due_date DATE,
    status ENUM('PENDING', 'PARTIAL', 'PAID', 'OVERDUE') DEFAULT 'PENDING',
    FOREIGN KEY (party_id) REFERENCES parties(party_id),
    FOREIGN KEY (fee_head_id) REFERENCES fee_heads(fee_head_id),
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(academic_year_id)
);

CREATE TABLE fee_payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    fee_demand_id INT NOT NULL,
    transaction_id INT,
    payment_mode ENUM('CASH', 'ONLINE', 'CHEQUE') NOT NULL,
    amount_paid DECIMAL(10, 2) NOT NULL,
    paid_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (fee_demand_id) REFERENCES fee_demands(fee_demand_id),
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

-- 3.2 EXPENSES MANAGEMENT (Utilities, Events, Maintenance)
CREATE TABLE expense_categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    type ENUM('UTILITIES', 'EVENTS', 'MAINTENANCE', 'OPERATIONAL') NOT NULL
);

CREATE TABLE expenses (
    expense_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    payee_name VARCHAR(100),
    amount DECIMAL(10, 2) NOT NULL,
    expense_date DATE NOT NULL,
    description TEXT,
    transaction_id INT,
    status ENUM('PENDING', 'APPROVED', 'PAID') DEFAULT 'PENDING',
    FOREIGN KEY (category_id) REFERENCES expense_categories(category_id),
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

-- 3.3 SALARY & PAYROLL (Teaching, Non-Teaching)
CREATE TABLE payrolls (
    payroll_id INT AUTO_INCREMENT PRIMARY KEY,
    party_id INT NOT NULL COMMENT 'Staff',
    month VARCHAR(20) NOT NULL,
    year INT NOT NULL,
    basic_salary DECIMAL(10, 2) NOT NULL,
    allowances DECIMAL(10, 2) DEFAULT 0,
    deductions DECIMAL(10, 2) DEFAULT 0,
    net_salary DECIMAL(10, 2) GENERATED ALWAYS AS (basic_salary + allowances - deductions) STORED,
    status ENUM('GENERATED', 'PROCESSED', 'PAID') DEFAULT 'GENERATED',
    transaction_id INT,
    payment_date DATE,
    FOREIGN KEY (party_id) REFERENCES parties(party_id),
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);

-- 3.4 PURCHASES & VENDOR PAYMENTS
CREATE TABLE purchases (
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    party_id INT NOT NULL COMMENT 'Vendor',
    invoice_number VARCHAR(50),
    items_description TEXT,
    total_amount DECIMAL(10, 2) NOT NULL,
    purchase_date DATE NOT NULL,
    status ENUM('ORDERED', 'RECEIVED', 'PAID') DEFAULT 'ORDERED',
    transaction_id INT,
    FOREIGN KEY (party_id) REFERENCES parties(party_id),
    FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id)
);


-- --------------------------------------------------------
-- 4. SEED DATA (POPULATING THE APP)
-- --------------------------------------------------------

-- Academic Year
INSERT INTO academic_years (year_name, start_date, end_date, is_current) VALUES 
('2023-2024', '2023-04-01', '2024-03-31', TRUE);

-- Chart of Accounts
INSERT INTO accounts (account_name, account_type) VALUES 
('Cash in Hand', 'ASSET'),
('HDFC Bank', 'ASSET'),
('Tuition Fees', 'INCOME'),
('Transport Fees', 'INCOME'),
('Hostel Fees', 'INCOME'),
('Salary Expense', 'EXPENSE'),
('Utilities Expense', 'EXPENSE'),
('Maintenance Expense', 'EXPENSE'),
('Inventory Purchase', 'EXPENSE'),
('Accounts Payable', 'LIABILITY'),
('Accounts Receivable', 'ASSET');

-- Parties (Mix of Students, Staff, Vendors)
INSERT INTO parties (party_type, reference_id, full_name, department) VALUES 
('STUDENT', 'ST-001', 'John Doe', 'Class 10'),
('STUDENT', 'ST-002', 'Jane Smith', 'Class 9'),
('STAFF', 'EMP-001', 'James Wilson', 'Teaching'),
('STAFF', 'EMP-002', 'Sarah Connor', 'Admin'),
('STAFF', 'EMP-003', 'Robert Brown', 'Non-Teaching'),
('VENDOR', 'VEN-001', 'Office Depot', NULL),
('VENDOR', 'VEN-002', 'City Power Corp', NULL),
('VENDOR', 'VEN-003', 'Tech Solutions', NULL);

-- Fee Heads
INSERT INTO fee_heads (name, category) VALUES 
('Term 1 Tuition', 'TUITION'),
('Annual Transport', 'TRANSPORT'),
('Hostel Room Fee', 'HOSTEL'),
('Admission Fee', 'ADMISSION');

-- Expense Categories
INSERT INTO expense_categories (name, type) VALUES 
('Electricity Bill', 'UTILITIES'),
('Annual Sports Day', 'EVENTS'),
('Building Repair', 'MAINTENANCE'),
('Cleaning Services', 'OPERATIONAL');

-- Seed Fee Demands
INSERT INTO fee_demands (party_id, fee_head_id, academic_year_id, amount, due_date, status) VALUES 
(1, 1, 1, 5000.00, '2023-04-10', 'PAID'), 
(2, 1, 1, 5000.00, '2023-04-10', 'PENDING'),
(1, 2, 1, 2000.00, '2023-04-15', 'PENDING');

-- Seed Payroll
INSERT INTO payrolls (party_id, month, year, basic_salary, status) VALUES 
(3, 'April', 2023, 4500.00, 'PAID'),
(4, 'April', 2023, 3200.00, 'PROCESSED'),
(5, 'April', 2023, 2800.00, 'GENERATED');

-- Seed Purchases
INSERT INTO purchases (party_id, invoice_number, items_description, total_amount, purchase_date, status) VALUES 
(6, 'INV-998', 'Bulk Whiteboard Markers', 450.00, '2023-05-01', 'PAID'),
(8, 'INV-102', 'Computer Lab Maintenance', 1200.00, '2023-05-05', 'RECEIVED');

-- Seed Expenses
INSERT INTO expenses (category_id, payee_name, amount, expense_date, description, status) VALUES 
(1, 'City Power Corp', 1500.00, '2023-05-10', 'April Electricity Bill', 'PAID'),
(2, 'Event organizers', 5000.00, '2023-06-01', 'Annual Sports Day Advance', 'APPROVED');
