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
        
        <style>{`
          .hackdata-btn {
            background-color: #111;
            color: #fffc4d;
            padding: 6px 16px;
            border-radius: 999px;
            text-decoration: none;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: opacity 0.2s;
          }
          .hackdata-btn:hover {
            opacity: 0.8;
          }
        `}</style>
        <a href="/hackdatav2/index.html" className="hackdata-btn">
          Register Now ➔
        </a>

      </div>

      <main>{children}</main>
      <Footer />
    </>
  );
}
