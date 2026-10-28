import { motion } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { navLinks, profile, socials } from '../data/portfolio.js';
import { GithubIcon, LinkedinIcon } from './icons.jsx';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    document.querySelector('.logo')?.focus({ preventScroll: true });
  };

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="#home" className="logo">
            <span className="logo-mark">{profile.initials}</span>
            <span className="logo-text">{profile.name}</span>
          </a>
          <p>{profile.title} · {profile.location}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="footer-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="social-row">
          {socials.github && (
            <a href={socials.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub profile">
              <GithubIcon size={18} />
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn profile">
              <LinkedinIcon size={18} />
            </a>
          )}
          <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Send email">
            <Mail size={18} />
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {year} {profile.fullName}. All rights reserved.
        </p>
        <motion.button
          type="button"
          className="back-to-top"
          onClick={scrollToTop}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} aria-hidden="true" /> Back to top
        </motion.button>
      </div>
    </footer>
  );
}
