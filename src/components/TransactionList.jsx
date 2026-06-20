import React, { useState, useMemo } from 'react';

const CATEGORY_COLORS = {
  Housing:       '#6366F1', Food:    '#10B981', Dining: '#F59E0B',
  Transport:     '#3B82F6', Entertainment: '#EC4899', Health: '#14B8A6',
  Shopping:      '#8B5CF6', Utilities: '#F97316', Salary: '#10B981',
  Freelance:     '#6366F1', Travel: '#06B6D4', Other: '#94A3B8',
};

const FILTERS = ['All', 'Income', 'Expense'];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function TransactionList({ transactions, onEdit, onDelete, onAdd }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === 'All' || t.type === filter.toLowerCase();
      return matchSearch && matchFilter;
    });
  }, [transactions, search, filter]);

  return (
    <div className="card fade-up-3">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div className="card-title" style={{ margin: 0 }}>Recent Transactions</div>
        <button className="btn btn-primary" onClick={onAdd} style={{ padding: '8px 16px', fontSize: 13 }}>
          + Add New
        </button>
      </div>

      {/* Search */}
      <div className="search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--muted)', flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 16, lineHeight: 1 }}>×</button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="filter-tabs">
        {FILTERS.map(f => (
          <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ maxHeight: 400, overflowY: 'auto', paddingRight: 4 }}>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <p>No transactions found</p>
          </div>
        ) : (
          filtered.map(t => (
            <div key={t.id} className="txn-row" onClick={() => onEdit(t)}>
              <div
                className="txn-icon"
                style={{ background: `${CATEGORY_COLORS[t.category] || '#94A3B8'}18` }}
              >
                {t.icon}
              </div>
              <div className="txn-meta">
                <div className="txn-title">{t.title}</div>
                <div className="txn-date">
                  <span style={{
                    display: 'inline-block',
                    background: `${CATEGORY_COLORS[t.category] || '#94A3B8'}18`,
                    color: CATEGORY_COLORS[t.category] || '#94A3B8',
                    padding: '1px 8px',
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 600,
                    marginRight: 6,
                  }}>{t.category}</span>
                  {formatDate(t.date)}
                </div>
              </div>
              <div className={`txn-amount ${t.type}`}>
                {t.type === 'income' ? '+' : '-'}₹{Math.abs(t.amount).toLocaleString('en-IN')}
              </div>
              <button
                onClick={e => { e.stopPropagation(); onDelete(t.id); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#CBD5E1', fontSize: 16, padding: '4px 6px',
                  borderRadius: 6, transition: 'color 0.15s, background 0.15s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F43F5E'; e.currentTarget.style.background = '#FEE2E2'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#CBD5E1'; e.currentTarget.style.background = 'none'; }}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {filtered.length > 0 && (
        <div style={{
          marginTop: 12, textAlign: 'center',
          fontSize: 12, color: 'var(--muted)',
        }}>
          Showing {filtered.length} of {transactions.length} transactions
        </div>
      )}
    </div>
  );
}
