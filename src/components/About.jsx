import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { about } from '../data/portfolio.js';
import { DataIcon } from './icons.jsx';
import { Placeholder, Reveal, Section, fadeUp, stagger } from './ui.jsx';

export default function About() {
  return (
    <Section id="about" eyebrow="About me" title="Full stack, end to end">
      <div className="about-grid">
        <Reveal className="about-copy">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}

          <div className="stats">
            {about.stats.map((stat) => (
              <div key={stat.label} className="stat glass">
                <span className="stat-value gradient-text">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          {about.achievements.length > 0 ? (
            <ul className="achievements">
              {about.achievements.map((item) => (
                <li key={item}>
                  <Award size={16} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          ) : (
            //<Placeholder>add achievements in about.achievements</Placeholder>
            <></>
          )}
        </Reveal>

        <motion.ul
          className="highlight-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger(0.07)}
        >
          {about.highlights.map((item) => (
            <motion.li key={item.title} className="highlight glass card-hover" variants={fadeUp}>
              <span className="icon-badge">
                <DataIcon name={item.icon} size={20} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
}
