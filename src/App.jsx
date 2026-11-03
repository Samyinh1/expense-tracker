import React, { useReducer, useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import CreditCard3D from './components/CreditCard3D';
import { DonutChart, MonthlyBarChart, BalanceTrendChart } from './components/Charts';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import {
  SkeletonStatCards, SkeletonCard,
  SkeletonTransactionList, SkeletonCategoryList,
} from './components/Skeleton';


// ─── Initial data ──────────────────────────────────────────────
const SEED = [
  { id: 1,  title: 'Monthly Salary',     amount: 55000, type: 'income',  category: 'Salary',        date: '2026-06-01', icon: '💼', note: '' },
  { id: 2,  title: 'Freelance Project',  amount: 27000, type: 'income',  category: 'Freelance',     date: '2026-06-05', icon: '💻', note: '' },
  { id: 3,  title: 'Apartment Rent',     amount: 12000, type: 'expense', category: 'Housing',       date: '2026-06-01', icon: '🏠', note: '' },
  { id: 4,  title: 'Grocery Shopping',   amount: 3800,  type: 'expense', category: 'Food',          date: '2026-06-08', icon: '🛒', note: '' },
  { id: 5,  title: 'Netflix',            amount: 649,   type: 'expense', category: 'Entertainment', date: '2026-06-10', icon: '🎬', note: '' },
  { id: 6,  title: 'Gym Membership',     amount: 1200,  type: 'expense', category: 'Health',        date: '2026-06-01', icon: '🏋️', note: '' },
  { id: 7,  title: 'Restaurant Dinner',  amount: 1450,  type: 'expense', category: 'Dining',        date: '2026-06-12', icon: '🍔', note: '' },
  { id: 8,  title: 'Uber Rides',         amount: 870,   type: 'expense', category: 'Transport',     date: '2026-06-15', icon: '🚗', note: '' },
  { id: 9,  title: 'Amazon Shopping',    amount: 2340,  type: 'expense', category: 'Shopping',      date: '2026-06-14', icon: '🛍️', note: '' },
  { id: 10, title: 'Electricity Bill',   amount: 950,   type: 'expense', category: 'Utilities',     date: '2026-06-07', icon: '⚡', note: '' },
  { id: 11, title: 'Spotify',            amount: 119,   type: 'expense', category: 'Entertainment', date: '2026-06-10', icon: '🎵', note: '' },
  { id: 12, title: 'Pharmacy',           amount: 580,   type: 'expense', category: 'Health',        date: '2026-06-11', icon: '💊', note: '' },
  { id: 13, title: 'Weekend Getaway',    amount: 8500,  type: 'expense', category: 'Travel',        date: '2026-06-09', icon: '✈️', note: '' },
  { id: 14, title: 'Coffee Shop',        amount: 430,   type: 'expense', category: 'Dining',        date: '2026-06-16', icon: '☕', note: '' },
  { id: 15, title: 'Internet Bill',      amount: 699,   type: 'expense', category: 'Utilities',     date: '2026-06-07', icon: '📡', note: '' },
  { id: 16, title: 'May Salary',         amount: 55000, type: 'income',  category: 'Salary',        date: '2026-05-01', icon: '💼', note: '' },
  { id: 17, title: 'May Rent',           amount: 12000, type: 'expense', category: 'Housing',       date: '2026-05-01', icon: '🏠', note: '' },
  { id: 18, title: 'May Groceries',      amount: 3500,  type: 'expense', category: 'Food',          date: '2026-05-08', icon: '🛒', note: '' },
  { id: 19, title: 'May Dining',         amount: 2100,  type: 'expense', category: 'Dining',        date: '2026-05-15', icon: '🍔', note: '' },
  { id: 20, title: 'Client Payment',     amount: 18000, type: 'income',  category: 'Freelance',     date: '2026-05-20', icon: '💻', note: '' },
];

function getFromStorage() {
  try {
    const raw = localStorage.getItem('expenseiq_txns');
    return raw ? JSON.parse(raw) : SEED;
  } catch { return SEED; }
}

function saveToStorage(txns) {
  localStorage.setItem('expenseiq_txns', JSON.stringify(txns));
}

// ─── Reducer ───────────────────────────────────────────────────
function reducer(state, action) {
  let next;
  switch (action.type) {
    case 'ADD':
      next = [action.payload, ...state];
      break;
    case 'EDIT':
      next = state.map(t => t.id === action.payload.id ? action.payload : t);
      break;
    case 'DELETE':
      next = state.filter(t => t.id !== action.payload);
      break;
    default:
      return state;
  }
  saveToStorage(next);
  return next;
}

// ─── Helpers ───────────────────────────────────────────────────
function computeStats(transactions) {
  const income   = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
  const balance  = income - expenses;
  const savings  = income > 0 ? ((balance / income) * 100).toFixed(1) : 0;
  return { income, expenses, balance, savings };
}

// ─── App ───────────────────────────────────────────────────────
export default function App() {
  const [transactions, dispatch] = useReducer(reducer, null, getFromStorage);
  const [activeNav, setActiveNav]   = useState('dashboard');
  const [isLoading, setIsLoading]   = useState(true);
  const [modal, setModal]           = useState(null); // null | 'add' | transaction object (edit)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const { income, expenses, balance, savings } = computeStats(transactions);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleSave = (txn) => {
    if (modal && modal !== 'add') {
      dispatch({ type: 'EDIT', payload: txn });
    } else {
      dispatch({ type: 'ADD', payload: txn });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE', payload: id });
    }
  };

  return (
    <div className="app-shell">
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} />

      <main className="main-content">
        {/* ── Page Header ── */}
        <div className="page-header fade-up">
          <div>
            <h1>{getGreeting()}, Suman! 👋</h1>
            <p>Here's your financial overview for June 2026</p>
          </div>
          <div className="header-actions">
            <div style={{
              background: 'var(--surface)',
              borderRadius: 10,
              padding: '8px 16px',
              fontSize: 13, fontWeight: 600,
              color: 'var(--muted)',
              border: '1.5px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              📅 June 2026
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setModal('add')}
            >
              + Add Transaction
            </button>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        {isLoading ? <SkeletonStatCards /> : (
          <div className="stats-grid">
            <StatCard type="balance"  label="Total Balance"  value={balance}  icon="💳" trend={8.2}  trendUp className="fade-up" />
            <StatCard type="income"   label="Total Income"   value={income}   icon="📈" trend={12.5} trendUp className="fade-up-1" />
            <StatCard type="expense"  label="Total Expenses" value={expenses} icon="📉" trend={3.1}  trendUp={false} className="fade-up-2" />
            <StatCard type="savings"  label="Savings Rate"   value={savings}  icon="🏦" trend={2.4}  trendUp prefix="" className="fade-up-3" />
          </div>
        )}

        {/* ── Mid: 3D Card + Donut ── */}
        {isLoading ? (
          <div className="mid-grid">
            <SkeletonCard height={300} />
            <SkeletonCard height={300} />
          </div>
        ) : (
          <div className="mid-grid">
            <div className="card fade-up-1" style={{ minHeight: 280 }}>
              <div className="card-title">My Card</div>
              <CreditCard3D
                balance={balance}
                holder="SUMAN MOG"
                income={income}
                expense={expenses}
              />
            </div>
            <DonutChart transactions={transactions} />
          </div>
        )}

        {/* ── Bottom: Transaction list + monthly chart ── */}
        {isLoading ? (
          <div className="bottom-grid">
            <SkeletonTransactionList />
            <SkeletonCategoryList />
          </div>
        ) : (
          <div className="bottom-grid">
            <TransactionList
              transactions={transactions}
              onEdit={t => setModal(t)}
              onDelete={handleDelete}
              onAdd={() => setModal('add')}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <MonthlyBarChart transactions={transactions} />
              <BalanceTrendChart transactions={transactions} />
            </div>
          </div>
        )}

        {/* ── Footer ── */}
        <div style={{
          textAlign: 'center', padding: '24px 0 8px',
          fontSize: 12, color: 'var(--muted)',
          borderTop: '1px solid var(--border)',
          marginTop: 8,
        }}>
          ExpenseIQ · Built with React.js · {new Date().getFullYear()}
        </div>
      </main>

      {/* ── Modal ── */}
      {modal && (
        <AddTransactionModal
          editing={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
