import React, { useState } from 'react';

export default function CreditCard3D({ balance, holder, income, expense }) {
  const [rot, setRot] = useState({ x: 8, y: -12 });

  const onMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.width / 2, cy = rect.height / 2;
    const x = e.clientX - rect.left - cx;
    const y = e.clientY - rect.top - cy;
    setRot({ x: (y / cy) * -12, y: (x / cx) * 14 });
  };
  const onLeave = () => setRot({ x: 8, y: -12 });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>
      {/* 3D Card */}
      <div
        className="card-3d-wrap"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ flex: 1 }}
      >
        <div
          className="floating-card"
          style={{
            transform: `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
            animation: 'float 5s ease-in-out infinite',
          }}
        >
          {/* Main card face */}
          <div style={{
            width: '100%',
            paddingBottom: '58%',
            position: 'relative',
            borderRadius: 20,
            background: 'linear-gradient(135deg, #1E1B4B 0%, #4C1D95 40%, #6D28D9 70%, #7C3AED 100%)',
            boxShadow: `
              0 25px 50px rgba(109,40,217,0.45),
              0 0 0 1px rgba(255,255,255,0.12),
              inset 0 1px 0 rgba(255,255,255,0.15)
            `,
            overflow: 'hidden',
          }}>
            {/* Refraction orbs */}
            <div style={{
              position: 'absolute', top: -50, right: -50,
              width: 180, height: 180, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 65%)',
            }} />
            <div style={{
              position: 'absolute', bottom: -30, left: -30,
              width: 140, height: 140, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 65%)',
            }} />
            {/* Grid lines */}
            <svg style={{ position: 'absolute', inset: 0, opacity: 0.08 }} width="100%" height="100%">
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Card content */}
            <div style={{
              position: 'absolute', inset: 0,
              padding: '22px 24px',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'space-between',
              color: '#fff',
            }}>
              {/* Top row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.5px' }}>ExpenseIQ</div>
                {/* Contactless icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 12a6 6 0 0 1 6-6" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M3 12a9 9 0 0 1 9-9" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 12a3 3 0 0 1 3-3" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="12" r="1.5" fill="white"/>
                </svg>
              </div>

              {/* Chip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 30,
                  background: 'linear-gradient(135deg, #FDE68A, #F59E0B)',
                  borderRadius: 6, flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: '60%', height: '100%',
                    borderLeft: '1px solid rgba(0,0,0,0.15)',
                    borderRight: '1px solid rgba(0,0,0,0.15)',
                  }}/>
                </div>
                <div style={{ fontSize: 11, opacity: 0.6, letterSpacing: '0.05em' }}>DEBIT</div>
              </div>

              {/* Card number */}
              <div style={{ fontSize: 14, letterSpacing: '3px', fontWeight: 500, opacity: 0.9 }}>
                •••• •••• •••• 4242
              </div>

              {/* Bottom row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 9, opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Card Holder</div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{holder || 'SUMAN MOG'}</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, opacity: 0.55, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>Expires</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>06/28</div>
                </div>
                <div style={{
                  fontSize: 20, fontStyle: 'italic', fontWeight: 800,
                  opacity: 0.9, letterSpacing: '-1px',
                }}>VISA</div>
              </div>
            </div>
          </div>

          {/* Card shadow / depth */}
          <div style={{
            position: 'absolute',
            bottom: -14, left: '10%', right: '10%',
            height: 20,
            background: 'rgba(109,40,217,0.25)',
            filter: 'blur(16px)',
            borderRadius: '50%',
          }} />
        </div>
      </div>

      {/* Mini stats under card */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div style={{
          background: '#F0FDF4', borderRadius: 12,
          padding: '14px 16px',
        }}>
          <div style={{ fontSize: 11, color: '#065F46', fontWeight: 600, marginBottom: 4 }}>↑ Monthly Income</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#10B981' }}>
            ₹{(income || 0).toLocaleString('en-IN')}
          </div>
        </div>
        <div style={{
          background: '#FFF1F2', borderRadius: 12,
          padding: '14px 16px',
        }}>
          <div style={{ fontSize: 11, color: '#991B1B', fontWeight: 600, marginBottom: 4 }}>↓ Monthly Spend</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#F43F5E' }}>
            ₹{(expense || 0).toLocaleString('en-IN')}
          </div>
        </div>
      </div>
    </div>
  );
}
