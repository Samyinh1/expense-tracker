import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  AreaChart, Area,
} from 'recharts';

const CATEGORY_COLORS = {
  Housing:       '#6366F1',
  Food:          '#10B981',
  Dining:        '#F59E0B',
  Transport:     '#3B82F6',
  Entertainment: '#EC4899',
  Health:        '#14B8A6',
  Shopping:      '#8B5CF6',
  Utilities:     '#F97316',
  Salary:        '#10B981',
  Freelance:     '#6366F1',
  Travel:        '#06B6D4',
  Other:         '#94A3B8',
};

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div style={{ fontWeight: 700 }}>{payload[0].name}</div>
      <div style={{ opacity: 0.75, fontSize: 12 }}>₹{payload[0].value?.toLocaleString('en-IN')}</div>
    </div>
  );
}

function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, fontSize: 12, marginBottom: 2 }}>
          {p.name}: ₹{p.value?.toLocaleString('en-IN')}
        </div>
      ))}
    </div>
  );
}

export function DonutChart({ transactions }) {
  const data = Object.entries(
    transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        return acc;
      }, {})
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="card fade-up-2">
      <div className="card-title">Spending Breakdown</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Donut */}
        <div style={{ width: 160, height: 160, flexShrink: 0, position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%" cy="50%"
                innerRadius={48} outerRadius={72}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={CATEGORY_COLORS[entry.name] || '#94A3B8'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600 }}>TOTAL</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text)' }}>
              ₹{(total / 1000).toFixed(1)}k
            </div>
          </div>
        </div>

        {/* Legend */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.map(({ name, value }) => {
            const pct = ((value / total) * 100).toFixed(1);
            return (
              <div key={name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div className="cat-dot" style={{ background: CATEGORY_COLORS[name] || '#94A3B8' }} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)' }}>{pct}%</span>
                </div>
                <div style={{ height: 5, background: '#E2E8F0', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: CATEGORY_COLORS[name] || '#94A3B8',
                    borderRadius: 99,
                    transition: 'width 0.8s ease',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MonthlyBarChart({ transactions }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const data = months.map((month, mi) => {
    const monthTxns = transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === mi;
    });
    return {
      month,
      Income: monthTxns.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
      Expenses: monthTxns.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0),
    };
  }).filter(d => d.Income > 0 || d.Expenses > 0);

  if (!data.length) return (
    <div className="card fade-up-3">
      <div className="card-title">Monthly Overview</div>
      <div className="empty-state"><div className="icon">📅</div><p>No data yet</p></div>
    </div>
  );

  return (
    <div className="card fade-up-3">
      <div className="card-title">Monthly Overview</div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barCategoryGap="30%" barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false}
            tickFormatter={v => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} />
          <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
          <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
          <Bar dataKey="Income"   fill="#10B981" radius={[6, 6, 0, 0]} />
          <Bar dataKey="Expenses" fill="#F43F5E" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BalanceTrendChart({ transactions }) {
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
  let running = 0;
  const data = sorted.map(t => {
    running += t.type === 'income' ? t.amount : -Math.abs(t.amount);
    return {
      name: new Date(t.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      Balance: running,
    };
  });

  if (!data.length) return null;

  return (
    <div className="card fade-up-4">
      <div className="card-title">Balance Trend</div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#6366F1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false}
            interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} axisLine={false} tickLine={false}
            tickFormatter={v => `₹${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone" dataKey="Balance"
            stroke="#6366F1" strokeWidth={2.5}
            fill="url(#balGrad)"
            dot={false} activeDot={{ r: 5, fill: '#6366F1' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
