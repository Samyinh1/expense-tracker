import React from 'react';

const gradients = {
  balance:  'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
  income:   'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
  expense:  'linear-gradient(135deg, #F43F5E 0%, #F59E0B 100%)',
  savings:  'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
};

const iconBg = {
  balance: 'rgba(255,255,255,0.2)',
  income:  'rgba(255,255,255,0.2)',
  expense: 'rgba(255,255,255,0.2)',
  savings: 'rgba(255,255,255,0.2)',
};

export default function StatCard({ type, label, value, trend, trendUp, icon, prefix = '₹', className = '' }) {
  return (
    <div
      className={`card ${className}`}
      style={{
        background: gradients[type] || gradients.balance,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 130, height: 130, borderRadius: '50%',
        background: 'rgba(255,255,255,0.1)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -30, right: 30,
        width: 80, height: 80, borderRadius: '50%',
        background: 'rgba(255,255,255,0.07)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, position: 'relative' }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: iconBg[type],
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22,
        }}>
          {icon}
        </div>
        {trend != null && (
          <span style={{
            background: trendUp ? 'rgba(16,185,129,0.25)' : 'rgba(244,63,94,0.25)',
            color: trendUp ? '#A7F3D0' : '#FECDD3',
            padding: '4px 10px',
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: 3,
          }}>
            {trendUp ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{
          fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px',
          marginBottom: 4,
        }}>
          {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}
        </div>
        <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}
