import { motion } from 'framer-motion';
import { skills } from '../data/portfolio.js';
import { DataIcon } from './icons.jsx';
import { Section, fadeUp, stagger } from './ui.jsx';

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Technical skills"
      title="The stack I build with"
      intro="Technologies I use day to day across the backend, frontend, data layer and delivery tooling."
    >
      <motion.div
        className="skills-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger(0.1)}
      >
        {skills.map((group) => (
          <motion.article key={group.category} className={`skill-card glass card-hover accent-${group.accent}`} variants={fadeUp}>
            <header className="skill-card-head">
              <span className="icon-badge">
                <DataIcon name={group.icon} />
              </span>
              <h3>{group.category}</h3>
              <span className="skill-count">{String(group.items.length).padStart(2, '0')}</span>
            </header>
            <ul className="skill-list">
              {group.items.map((item) => (
                <li key={item} className="skill-chip">
                  <span className="skill-dot" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
