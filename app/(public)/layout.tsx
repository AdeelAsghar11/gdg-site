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
      
      {/* HackData V2 Banner - Auto hides after September 29, 2026 */}
      {new Date() < new Date('2026-09-30T00:00:00Z') && (
        <div className="hackdata-banner">
          <span>HACKDATA V2 is officially here! Don't miss out on the ultimate hackathon experience.</span>
          
          <style>{`
            .hackdata-banner {
              background-color: #fffc4d;
              color: #111;
              padding: 12px 24px;
              text-align: center;
              font-weight: bold;
              font-size: 14px;
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 12px;
              border-bottom: 1px solid #111;
            }
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
              white-space: nowrap;
            }
            .hackdata-btn:hover {
              opacity: 0.8;
            }
            @media (max-width: 768px) {
              .hackdata-banner {
                flex-direction: column;
                padding: 16px;
                font-size: 13px;
                gap: 16px;
              }
              .hackdata-btn {
                width: 100%;
                text-align: center;
                padding: 10px 16px;
              }
            }
          `}</style>
          <a href="/hackdatav2/index.html" className="hackdata-btn">
            Register Now ➔
          </a>
        </div>
      )}

      <main>{children}</main>
      <Footer />
    </>
  );
}
