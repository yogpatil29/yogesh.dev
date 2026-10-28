import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin, MessageSquare } from 'lucide-react';
import { profile, socials } from '../data/portfolio.js';
import { GithubIcon, LinkedinIcon } from './icons.jsx';
import { fadeUp, stagger } from './ui.jsx';

function RoleCycler({ roles }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % roles.length), 2600);
    return () => clearInterval(timer);
  }, [roles.length, reduceMotion]);

  return (
    <p className="hero-role">
      <span className="sr-only">{roles.join(', ')}</span>
      <span className="hero-role-prefix" aria-hidden="true">
        &gt;
      </span>
      <span className="hero-role-window" aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[index]}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gradient on an inner span: Chrome drops background-clip:text on animated layers. */}
            <span className="gradient-text">{roles[index]}</span>
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="caret" aria-hidden="true" />
    </p>
  );
}

// Each line is a list of [tokenClass, text] pairs for lightweight syntax colouring.
const codeLines = [
  [['k', '@RestController']],
  [['k', '@RequestMapping'], ['p', '('], ['s', '"/api/projects"'], ['p', ')']],
  [['k', 'public class '], ['t', 'ProjectController'], ['p', ' {']],
  [],
  [['p', '  '], ['k', 'private final '], ['t', 'ProjectService'], ['p', ' service;']],
  [],
  [['p', '  '], ['k', '@GetMapping'], ['p', '('], ['s', '"/{id}"'], ['p', ')']],
  [['p', '  '], ['k', 'public '], ['t', 'ResponseEntity'], ['p', '<'], ['t', 'ProjectDto'], ['p', '> '], ['f', 'get'], ['p', '(']],
  [['p', '      '], ['k', '@PathVariable '], ['t', 'Long'], ['p', ' id) {']],
  [['p', '    '], ['k', 'return '], ['t', 'ResponseEntity'], ['p', '.'], ['f', 'ok'], ['p', '(service.'], ['f', 'findById'], ['p', '(id));']],
  [['p', '  }']],
  [['p', '}']],
];

const floatingTech = [
  { label: 'Spring Boot', className: 'chip-a' },
  { label: 'React', className: 'chip-b' },
  { label: 'MySQL', className: 'chip-c' },
  { label: 'Hibernate', className: 'chip-d' },
  { label: 'REST', className: 'chip-e' },
];

function CodeVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="hero-ring" />
      <motion.div
        className="code-window glass"
        initial={{ opacity: 0, y: 40, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="code-header">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
          <span className="code-file">ProjectController.java</span>
        </div>
        <pre className="code-body">
          {codeLines.map((tokens, lineIndex) => (
            <motion.span
              key={lineIndex}
              className="code-line"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + lineIndex * 0.07, duration: 0.35 }}
            >
              <span className="line-no">{String(lineIndex + 1).padStart(2, ' ')}</span>
              {tokens.map(([kind, text], tokenIndex) => (
                <span key={tokenIndex} className={`tok-${kind}`}>
                  {text}
                </span>
              ))}
              {lineIndex === codeLines.length - 1 && <span className="caret caret-sm" />}
            </motion.span>
          ))}
        </pre>
        <div className="code-status">
          <span className="status-dot" /> 200 OK · application/json
        </div>
      </motion.div>

      {floatingTech.map((chip, index) => (
        <motion.span
          key={chip.label}
          className={`float-chip glass ${chip.className}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: 1.2 + index * 0.12 },
            scale: { delay: 1.2 + index * 0.12 },
            y: { duration: 4 + index * 0.6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 },
          }}
        >
          {chip.label}
        </motion.span>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <motion.div className="hero-copy" initial="hidden" animate="visible" variants={stagger(0.1, 0.1)}>
          <motion.p className="availability" variants={fadeUp}>
            <span className="pulse-dot" aria-hidden="true" />
            {profile.availability}
          </motion.p>
          <motion.p className="hero-greeting" variants={fadeUp}>
            {profile.heroGreeting} <span aria-hidden="true" className="wave">👋</span>
          </motion.p>
          <motion.h1 id="hero-title" className="hero-title" variants={fadeUp}>
            Building <span className="gradient-text">Scalable Applications</span> with Java &amp; React
          </motion.h1>
          <motion.div variants={fadeUp}>
            <RoleCycler roles={profile.heroRoles} />
          </motion.div>
          <motion.p className="hero-intro" variants={fadeUp}>
            {profile.heroIntro}
          </motion.p>

          <motion.div className="hero-ctas" variants={fadeUp}>
            <motion.a href="#projects" className="btn btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              View My Projects <ArrowRight size={18} aria-hidden="true" />
            </motion.a>
            <motion.a href="#contact" className="btn btn-ghost" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <MessageSquare size={18} aria-hidden="true" /> Let&apos;s Work Together
            </motion.a>
          </motion.div>

          <motion.div className="hero-meta" variants={fadeUp}>
            <div className="social-row">
              {socials.github && (
                <a href={socials.github} target="_blank" rel="noreferrer" className="icon-btn" aria-label="GitHub profile">
                  <GithubIcon />
                </a>
              )}
              {socials.linkedin && (
                <a href={socials.linkedin} target="_blank" rel="noreferrer" className="icon-btn" aria-label="LinkedIn profile">
                  <LinkedinIcon />
                </a>
              )}
            </div>
            <span className="hero-location">
              <MapPin size={16} aria-hidden="true" /> {profile.location}
            </span>
            <span className="hero-location">{profile.experience} of experience</span>
          </motion.div>
        </motion.div>

        <CodeVisual />
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
        <span />
      </a>
    </section>
  );
}
