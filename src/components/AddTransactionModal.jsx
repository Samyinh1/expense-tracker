import React, { useState, useEffect } from 'react';

const CATEGORIES = {
  income:  ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  expense: ['Housing', 'Food', 'Dining', 'Transport', 'Entertainment', 'Health', 'Shopping', 'Utilities', 'Travel', 'Other'],
};

const CAT_ICONS = {
  Housing: '🏠', Food: '🛒', Dining: '🍔', Transport: '🚗',
  Entertainment: '🎬', Health: '💊', Shopping: '🛍️', Utilities: '⚡',
  Salary: '💼', Freelance: '💻', Investment: '📈', Gift: '🎁',
  Travel: '✈️', Other: '💡',
};

const EMPTY = {
  title: '', amount: '', type: 'expense', category: 'Dining',
  date: new Date().toISOString().slice(0, 10), note: '',
};

export default function AddTransactionModal({ onClose, onSave, editing }) {
  const [form, setForm] = useState(editing
    ? { ...editing, amount: Math.abs(editing.amount).toString() }
    : EMPTY
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!CATEGORIES[form.type].includes(form.category)) {
      setForm(f => ({ ...f, category: CATEGORIES[f.type][0] }));
    }
  }, [form.type]);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) e.amount = 'Enter a valid amount';
    if (!form.date) e.date = 'Date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      ...form,
      id: editing?.id ?? Date.now(),
      amount: Number(form.amount),
      icon: CAT_ICONS[form.category] || '💡',
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-title">
          <span>{editing ? '✏️ Edit Transaction' : '➕ New Transaction'}</span>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {/* Type toggle */}
        <div className="type-toggle">
          <button
            className={`type-btn ${form.type === 'income' ? 'active-income' : ''}`}
            onClick={() => set('type', 'income')}
          >
            ↑ Income
          </button>
          <button
            className={`type-btn ${form.type === 'expense' ? 'active-expense' : ''}`}
            onClick={() => set('type', 'expense')}
          >
            ↓ Expense
          </button>
        </div>

        {/* Title */}
        <div className="form-group">
          <label className="form-label">Transaction Title</label>
          <input
            className="form-input"
            placeholder="e.g. Monthly Salary, Grocery Run…"
            value={form.title}
            onChange={e => set('title', e.target.value)}
          />
          {errors.title && <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.title}</div>}
        </div>

        {/* Amount + Date */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Amount (₹)</label>
            <input
              className="form-input"
              type="number"
              placeholder="0.00"
              min="0"
              value={form.amount}
              onChange={e => set('amount', e.target.value)}
            />
            {errors.amount && <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.amount}</div>}
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Date</label>
            <input
              className="form-input"
              type="date"
              value={form.date}
              onChange={e => set('date', e.target.value)}
            />
            {errors.date && <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.date}</div>}
          </div>
        </div>

        {/* Category */}
        <div className="form-group" style={{ marginTop: 18 }}>
          <label className="form-label">Category</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATEGORIES[form.type].map(cat => (
              <button
                key={cat}
                onClick={() => set('category', cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 99,
                  border: `2px solid ${form.category === cat ? 'var(--primary)' : 'var(--border)'}`,
                  background: form.category === cat ? 'rgba(99,102,241,0.1)' : 'transparent',
                  color: form.category === cat ? 'var(--primary)' : 'var(--muted)',
                  fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', gap: 5,
                }}
              >
                {CAT_ICONS[cat]} {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="form-group">
          <label className="form-label">Note (optional)</label>
          <input
            className="form-input"
            placeholder="Add a note…"
            value={form.note}
            onChange={e => set('note', e.target.value)}
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>
            {editing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}
