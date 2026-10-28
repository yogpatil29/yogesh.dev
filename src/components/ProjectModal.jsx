import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Lightbulb, Target, TrendingUp, X } from 'lucide-react';
import ProjectVisual from './ProjectVisual.jsx';
import ProjectLinks from './ProjectLinks.jsx';
import { Placeholder, Tag } from './ui.jsx';

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      // Keep keyboard focus inside the dialog.
      const focusable = [...dialogRef.current.querySelectorAll(focusableSelector)];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        ref={dialogRef}
        className="modal glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button ref={closeRef} type="button" className="modal-close icon-btn" onClick={onClose} aria-label="Close project details">
          <X size={20} />
        </button>

        <ProjectVisual project={project} large />

        <div className="modal-content">
          <p className="eyebrow">{project.role}</p>
          <h2 id="project-modal-title">{project.name}</h2>
          <p className="project-tagline">{project.tagline}</p>

          <div className="case-grid">
            <div className="case-block">
              <h3>
                <Target size={18} aria-hidden="true" /> The problem
              </h3>
              <p>{project.problem}</p>
            </div>
            <div className="case-block">
              <h3>
                <Lightbulb size={18} aria-hidden="true" /> The solution
              </h3>
              <p>{project.solution}</p>
            </div>
          </div>

          <h3 className="modal-subhead">Key contributions</h3>
          <ul className="check-list">
            {project.contributions.map((item) => (
              <li key={item}>
                <CheckCircle2 size={16} aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>

          <h3 className="modal-subhead">Features</h3>
          {project.features.length > 0 ? (
            <div className="tag-row">
              {project.features.map((feature) => (
                <span key={feature} className="feature-chip">
                  {feature}
                </span>
              ))}
            </div>
          ) : (
            <Placeholder>list of features / modules</Placeholder>
          )}

          {project.outcome ? (
            <p className="project-outcome modal-outcome">
              <TrendingUp size={18} aria-hidden="true" /> {project.outcome}
            </p>
          ) : (
            <Placeholder>measurable outcome (optional)</Placeholder>
          )}

          <h3 className="modal-subhead">Technologies</h3>
          <div className="tag-row">
            {project.tech.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          <div className="project-actions modal-actions">
            <ProjectLinks links={project.links} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
