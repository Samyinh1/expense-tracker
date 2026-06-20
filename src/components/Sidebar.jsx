import React from 'react';

const navItems = [
  { icon: '📊', label: 'Dashboard', id: 'dashboard' },
  { icon: '💸', label: 'Transactions', id: 'transactions' },
  { icon: '📈', label: 'Analytics', id: 'analytics' },
  { icon: '💼', label: 'Budget', id: 'budget' },
  { icon: '🏦', label: 'Accounts', id: 'accounts' },
];

export default function Sidebar({ activeNav, setActiveNav }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">💰</div>
        <div>
          <div className="logo-text">ExpenseIQ</div>
          <div className="logo-sub">Smart Finance</div>
        </div>
      </div>

      <div className="nav-section-label">Main Menu</div>
      {navItems.map(item => (
        <div
          key={item.id}
          className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
          onClick={() => setActiveNav(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}

      <div className="nav-section-label" style={{ marginTop: 16 }}>General</div>
      <div className="nav-item">
        <span className="nav-icon">⚙️</span>
        <span>Settings</span>
      </div>
      <div className="nav-item">
        <span className="nav-icon">🔔</span>
        <span>Notifications</span>
      </div>

      <div className="sidebar-user" style={{ marginTop: 'auto', paddingTop: 20 }}>
        <div className="user-avatar">S</div>
        <div>
          <div className="user-name">Suman Mog</div>
          <div className="user-role">React Developer</div>
        </div>
      </div>
    </aside>
  );
}
