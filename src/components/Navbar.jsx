import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks, profile } from '../data/portfolio.js';
import useActiveSection from '../hooks/useActiveSection.js';
import ResumeButton from './ResumeButton.jsx';

const sectionIds = navLinks.map((link) => link.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const toggleRef = useRef(null);

  // Collapsing the menu cancels the browser's native anchor scroll on mobile,
  // so close it first and scroll on the next frame.
  const navigateFromMenu = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;
    window.history.pushState(null, '', `#${id}`);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' }));
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOnDesktop = () => window.innerWidth > 900 && setMenuOpen(false);
    document.addEventListener('keydown', handleKey);
    window.addEventListener('resize', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('resize', closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled || menuOpen ? 'is-scrolled' : ''}`}>
      <nav className="container nav-inner" aria-label="Primary">
        <a href="#home" className="logo" aria-label={`${profile.name} — back to top`}>
          <span className="logo-mark">{profile.initials}</span>
          <span className="logo-text">
            {profile.name.split(' ')[0]}
            <span className="gradient-text">.dev</span>
          </span>
        </a>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={active === link.id ? 'is-active' : ''}
                aria-current={active === link.id ? 'true' : undefined}
              >
                {active === link.id && (
                  <motion.span layoutId="nav-pill" className="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="nav-label">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <ResumeButton className="btn btn-primary btn-sm nav-resume" compact label="Resume" />
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="container">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index }}
                >
                  <a
                    href={`#${link.id}`}
                    className={active === link.id ? 'is-active' : ''}
                    onClick={(event) => navigateFromMenu(event, link.id)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="mobile-menu-cta">
                <ResumeButton className="btn btn-primary btn-block" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
