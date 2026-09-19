import React from 'react';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      
      {/* HackData V2 Banner */}
      <div style={{
        backgroundColor: '#fffc4d',
        color: '#111',
        padding: '12px 24px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid #111'
      }}>
        <span style={{ fontSize: '16px' }}>🚀</span>
        <span>HACKDATA V2 is officially here! Don't miss out on the ultimate hackathon experience.</span>
        <a 
          href="/hackdatav2/index.html" 
          style={{
            backgroundColor: '#111',
            color: '#fffc4d',
            padding: '6px 16px',
            borderRadius: '999px',
            textDecoration: 'none',
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'opacity 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          Register Now ➔
        </a>
      </div>

      <main>{children}</main>
      <Footer />
    </>
  );
}
