import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/portfolio.js';
import ProjectLinks from './ProjectLinks.jsx';
import ProjectModal from './ProjectModal.jsx';
import ProjectVisual from './ProjectVisual.jsx';
import { Section, Tag, fadeUp, stagger } from './ui.jsx';

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const triggerRef = useRef(null);

  const openProject = (project, event) => {
    triggerRef.current = event.currentTarget;
    setSelected(project);
  };

  const closeProject = () => {
    setSelected(null);
    // Return focus to the button that opened the dialog.
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  return (
    <Section
      id="projects"
      eyebrow="Featured projects"
      title="Products I've led and built"
      intro="Business applications I have designed and developed as a team lead and full stack developer."
    >
      <motion.div
        className="projects-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger(0.14)}
      >
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            className="project-card glass"
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            <ProjectVisual project={project} />
            <div className="project-body">
              <p className="project-index">{String(index + 1).padStart(2, '0')} · {project.role}</p>
              <h3>{project.name}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-desc">{project.solution}</p>

              {project.outcome && <p className="project-outcome">{project.outcome}</p>}

              <ul className="project-points">
                {project.contributions.slice(0, 2).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <div className="tag-row">
                {project.tech.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>

              <div className="project-actions">
                <motion.button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={(event) => openProject(project, event)}
                  whileTap={{ scale: 0.97 }}
                  aria-haspopup="dialog"
                >
                  View Details <ArrowUpRight size={16} aria-hidden="true" />
                </motion.button>
                <ProjectLinks links={project.links} />
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={closeProject} />}</AnimatePresence>
    </Section>
  );
}
