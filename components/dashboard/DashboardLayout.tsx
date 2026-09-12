'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { SidebarLinks } from './SidebarLinks';
import { LogoutButton } from './LogoutButton';
import styles from './DashboardLayout.module.css';

type NavLink = {
  href:      string;
  label:     string;
  highlight?: boolean;
};

type DashboardLayoutProps = {
  children:    React.ReactNode;
  panelLabel:  string;
  accentColor: string;
  navLinks:    NavLink[];
  user: {
    name:     string;
    role:     string;
    imageUrl: string | null;
  };
};

export default function DashboardLayout({
  children,
  panelLabel,
  accentColor,
  navLinks,
  user,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar drawer automatically when navigating to another route
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    <div className={styles.layoutRoot}>
      {/* Mobile Top Header */}
      <header className={styles.mobileHeader}>
        <button
          type="button"
          className={styles.hamburgerBtn}
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <Menu size={22} />
        </button>

        <div className={styles.panelBadge}>
          <div className={styles.panelDot} style={{ background: accentColor }} />
          <span className={styles.panelLabelText}>{panelLabel}</span>
        </div>

        <div
          className={styles.userAvatarFallback}
          style={{
            background: accentColor + '20',
            color: accentColor,
            width: 32,
            height: 32,
            fontSize: '0.8rem',
          }}
        >
          {user.name.charAt(0)}
        </div>
      </header>

      {/* Backdrop overlay on mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar / Off-canvas drawer */}
      <aside
        data-lenis-prevent
        className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}
      >
        {/* Panel label with accent dot & Mobile close button */}
        <div className={styles.sidebarHeader}>
          <div className={styles.panelBadge}>
            <div className={styles.panelDot} style={{ background: accentColor }} />
            <span className={styles.panelLabelText}>{panelLabel}</span>
          </div>

          <button
            type="button"
            className={styles.sidebarCloseBtn}
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close Navigation Menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className={styles.navContainer}>
          <SidebarLinks links={navLinks} accentColor={accentColor} />
        </nav>

        {/* Signed-in user block */}
        <div className={styles.userBlock}>
          <a href="/" className={styles.publicLink}>
            ← Public site
          </a>

          <LogoutButton accentColor={accentColor} />

          <div
            className={styles.userProfileBadge}
            style={{ background: accentColor + '10' }}
          >
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                alt=""
                className={styles.userAvatarImg}
              />
            ) : (
              <div
                className={styles.userAvatarFallback}
                style={{
                  background: accentColor + '30',
                  color: accentColor,
                }}
              >
                {user.name.charAt(0)}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className={styles.userName}>{user.name}</p>
              <p className={styles.userRole} style={{ color: accentColor }}>
                {user.role}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
