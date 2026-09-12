"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        {/* Left Section: Mobile Hamburger + Logo Grouped Together */}
        <div className={styles.navLeft}>
          <button
            className={styles.hamburgerBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
            <img src="/images/GDG-Lockup.svg" alt="GDG Logo" className={styles.logoImage} />
          </Link>
        </div>
        
        {/* Desktop Navigation Links */}
        <ul className={styles.navLinks}>
          <li><Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link></li>
          
          {/* About GDG Dropdown */}
          <li
            className={styles.dropdownWrapper}
            onMouseEnter={() => setIsAboutDropdownOpen(true)}
            onMouseLeave={() => setIsAboutDropdownOpen(false)}
          >
            <button
              className={`${styles.dropdownTrigger} ${
                pathname === '/about' || pathname === '/community-guidelines' ? styles.active : ''
              }`}
              onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
              type="button"
            >
              About GDG <ChevronDown size={14} className={`${styles.chevronIcon} ${isAboutDropdownOpen ? styles.chevronRotated : ''}`} />
            </button>

            {isAboutDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link href="/about" onClick={() => setIsAboutDropdownOpen(false)} className={pathname === '/about' ? styles.activeDropdownItem : ''}>
                  About
                </Link>
                <Link href="/community-guidelines" onClick={() => setIsAboutDropdownOpen(false)} className={pathname === '/community-guidelines' ? styles.activeDropdownItem : ''}>
                  Community Guidelines
                </Link>
              </div>
            )}
          </li>

          <li><Link href="/events" className={pathname === '/events' ? styles.active : ''}>Events</Link></li>
          <li><Link href="/achievements" className={pathname === '/achievements' ? styles.active : ''}>Achievements</Link></li>
          <li><Link href="/gallery" className={pathname === '/gallery' ? styles.active : ''}>Gallery</Link></li>
          <li><Link href="/team" className={pathname === '/team' ? styles.active : ''}>Team</Link></li>
          <li><Link href="/clubs" className={pathname === '/clubs' ? styles.active : ''}>Clubs</Link></li>
          <li><Link href="/resources" className={pathname === '/resources' ? styles.active : ''}>Resources</Link></li>
          <li><a href="https://share.google/tC4uqVDSbojsVChXl" target="_blank" rel="noopener noreferrer">Bevy</a></li>
          
          {!isLoading && (
            <>
              {session ? (
                <>
                  <li>
                    <Link href="/dashboard" className={`${styles.joinBtn} ${pathname.startsWith('/dashboard') ? styles.active : ''}`}>
                      Go to Dashboard
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => signOut({ callbackUrl: '/' })} className={styles.logoutBtn} style={{ marginLeft: '12px' }}>
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login" className={`${pathname === '/login' ? styles.active : ''} ${styles.joinBtn}`}>
                    Sign In
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>

        {/* Right Section: Mobile Auth Action Button */}
        <div className={styles.navRight}>
          {!isLoading && (
            <>
              {session ? (
                <Link href="/dashboard" className={styles.mobileActionBtn} onClick={closeMobileMenu}>
                  Dashboard
                </Link>
              ) : (
                <Link href="/login" className={styles.mobileActionBtn} onClick={closeMobileMenu}>
                  Sign In
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile Slide-out Drawer */}
        {isMobileMenuOpen && (
          <div className={styles.mobileOverlay} onClick={closeMobileMenu}>
            <div className={styles.mobileDrawer} onClick={(e) => e.stopPropagation()}>
              <ul className={styles.mobileNavLinks}>
                <li><Link href="/" className={pathname === '/' ? styles.active : ''} onClick={closeMobileMenu}>Home</Link></li>
                
                {/* Mobile About Submenu */}
                <li className={styles.mobileSubGroup}>
                  <div className={styles.mobileSubHeader}>About GDG</div>
                  <div className={styles.mobileSubLinks}>
                    <Link href="/about" className={pathname === '/about' ? styles.active : ''} onClick={closeMobileMenu}>
                      About
                    </Link>
                    <Link href="/community-guidelines" className={pathname === '/community-guidelines' ? styles.active : ''} onClick={closeMobileMenu}>
                      Community Guidelines
                    </Link>
                  </div>
                </li>

                <li><Link href="/events" className={pathname === '/events' ? styles.active : ''} onClick={closeMobileMenu}>Events</Link></li>
                <li><Link href="/achievements" className={pathname === '/achievements' ? styles.active : ''} onClick={closeMobileMenu}>Achievements</Link></li>
                <li><Link href="/gallery" className={pathname === '/gallery' ? styles.active : ''} onClick={closeMobileMenu}>Gallery</Link></li>
                <li><Link href="/team" className={pathname === '/team' ? styles.active : ''} onClick={closeMobileMenu}>Team</Link></li>
                <li><Link href="/clubs" className={pathname === '/clubs' ? styles.active : ''} onClick={closeMobileMenu}>Clubs</Link></li>
                <li><Link href="/resources" className={pathname === '/resources' ? styles.active : ''} onClick={closeMobileMenu}>Resources</Link></li>
                <li><a href="https://share.google/tC4uqVDSbojsVChXl" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu}>Bevy</a></li>
                
                {!isLoading && (
                  <li className={styles.mobileAuthWrapper}>
                    {session ? (
                      <div className={styles.mobileAuthGroup}>
                        <Link href="/dashboard" className={styles.joinBtn} onClick={closeMobileMenu} style={{ marginLeft: 0, textAlign: 'center' }}>
                          Go to Dashboard
                        </Link>
                        <button onClick={() => { signOut({ callbackUrl: '/' }); closeMobileMenu(); }} className={styles.logoutBtn} style={{ width: '100%', marginTop: '8px' }}>
                          Sign out
                        </button>
                      </div>
                    ) : (
                      <Link href="/login" className={styles.joinBtn} onClick={closeMobileMenu} style={{ marginLeft: 0, display: 'block', textAlign: 'center' }}>
                        Sign In
                      </Link>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
