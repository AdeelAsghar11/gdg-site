'use client'

import React from 'react'
import { Printer, Download } from 'lucide-react'

interface IDCardTabProps {
  member: any
}

export default function IDCardTab({ member }: IDCardTabProps) {
  const year = new Date(member.createdAt).getFullYear()
  const memberId = `GDG-${year}-${String(member.id.slice(-4)).toUpperCase()}`
  const joinDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date(member.createdAt))

  const handlePrint = () => {
    window.print()
  }

  const getInitials = (name: string) => {
    const parts = name.split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, width: '100%' }}>
      {/* ID Card card */}
      <div id="id-card-print" style={{ 
        width: '100%',
        maxWidth: '400px', 
        minHeight: '230px', 
        background: '#fff', 
        borderRadius: 20, 
        padding: '24px',
        position: 'relative',
        boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        border: '1px solid #e8eaed',
        fontFamily: "'Google Sans', sans-serif",
        boxSizing: 'border-box'
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(66, 133, 244, 0.05) 0%, transparent 70%)', zIndex: 0 }}></div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#202124' }}>GDG<span style={{ color: '#4285F4' }}>oC</span></span>
            <span style={{ fontSize: '0.8rem', color: '#5F6368', fontWeight: 500 }}>Wah</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4285F4' }}></div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#EA4335' }}></div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FBBC04' }}></div>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34A853' }}></div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ width: 76, height: 76, borderRadius: 16, overflow: 'hidden', background: '#f1f3f4', border: '1px solid #e8eaed', flexShrink: 0 }}>
            {member.imageUrl ? (
              <img src={member.imageUrl} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1a73e8', fontSize: '1.5rem' }}>
                {getInitials(member.name)}
              </div>
            )}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
             <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.name}</h3>
             <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#1a73e8', letterSpacing: '.05em' }}>{member.role}</span>
             <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#5F6368', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.department || 'Member'}</p>
          </div>
        </div>

        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
           <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#5F6368', textTransform: 'uppercase', letterSpacing: '.08em' }}>Member ID</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'monospace', color: '#202124' }}>{memberId}</span>
           </div>
           <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#5F6368', textTransform: 'uppercase', letterSpacing: '.08em' }}>Join Date</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#202124' }}>{joinDate}</span>
           </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', width: '100%', maxWidth: '400px' }}>
        <button onClick={handlePrint} style={{
          flex: '1 1 140px',
          background: '#1a73e8', color: '#fff', border: 'none',
          padding: '12px 18px', borderRadius: 8, fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontSize: '0.9rem', boxShadow: '0 4px 12px rgba(26, 115, 232, 0.2)'
        }}>
          <Download size={18} /> Download/Print
        </button>
        <button style={{
          flex: '1 1 140px',
          background: '#fff', border: '1px solid #dadce0', color: '#3c4043',
          padding: '12px 18px', borderRadius: 8, fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontSize: '0.9rem'
        }}>
          <Printer size={18} /> Print Settings
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden; }
          #id-card-print, #id-card-print * { visibility: visible; }
          #id-card-print {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            box-shadow: none !important;
            border: 1px solid #dadce0 !important;
          }
        }
      `}} />
    </div>
  )
}
