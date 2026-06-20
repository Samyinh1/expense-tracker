import React from 'react';

function Skel({ w = '100%', h = 16, r = 8, style = {} }) {
  return (
    <div
      className="skeleton"
      style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }}
    />
  );
}

export function SkeletonStatCards() {
  return (
    <div className="stats-grid">
      {[0, 1, 2, 3].map(i => (
        <div className="card" key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <Skel w={48} h={48} r={12} />
            <Skel w={60} h={24} r={99} />
          </div>
          <Skel w="55%" h={32} r={8} style={{ marginBottom: 8 }} />
          <Skel w="40%" h={14} r={6} />
        </div>
      ))}
    </div>
  );
}

export function SkeletonCard({ height = 320 }) {
  return (
    <div className="card" style={{ height }}>
      <Skel w="40%" h={14} r={6} style={{ marginBottom: 20 }} />
      <Skel w="100%" h={height - 80} r={12} />
    </div>
  );
}

export function SkeletonTransactionList() {
  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Skel w="30%" h={14} r={6} />
        <Skel w={80} h={30} r={99} />
      </div>
      <Skel w="100%" h={44} r={10} style={{ marginBottom: 16 }} />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: '1px solid #E2E8F0' }}>
          <Skel w={42} h={42} r={12} />
          <div style={{ flex: 1 }}>
            <Skel w="55%" h={14} r={6} style={{ marginBottom: 6 }} />
            <Skel w="30%" h={11} r={5} />
          </div>
          <Skel w={64} h={18} r={6} />
        </div>
      ))}
    </div>
  );
}

export function SkeletonCategoryList() {
  return (
    <div className="card">
      <Skel w="45%" h={14} r={6} style={{ marginBottom: 20 }} />
      {[0, 1, 2, 3, 4].map(i => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <Skel w={10} h={10} r={99} />
          <Skel w="35%" h={13} r={6} />
          <div style={{ flex: 1 }}>
            <Skel w="100%" h={6} r={99} />
          </div>
          <Skel w={50} h={13} r={6} />
        </div>
      ))}
    </div>
  );
}
