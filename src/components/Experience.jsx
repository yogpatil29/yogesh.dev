import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, MapPin, Star } from 'lucide-react';
import { experience } from '../data/portfolio.js';
import { Placeholder, Section, Tag } from './ui.jsx';

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've been building">
      <ol className="timeline">
        {experience.map((job) => (
          <motion.li
            key={`${job.company}-${job.start}`}
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="timeline-node" aria-hidden="true">
              <Briefcase size={16} />
            </span>
            <article className="timeline-card glass">
              <header className="timeline-head">
                <div>
                  <h3>{job.title}</h3>
                  <p className="timeline-company gradient-text">{job.company}</p>
                  {job.role && <p className="timeline-role">{job.role}</p>}
                </div>
                <div className="timeline-meta">
                  <span>
                    <Calendar size={14} aria-hidden="true" /> {job.start} – {job.end}
                  </span>
                  {job.location ? (
                    <span>
                      <MapPin size={14} aria-hidden="true" /> {job.location}
                    </span>
                  ) : (
                    <Placeholder>job location (optional)</Placeholder>
                  )}
                </div>
              </header>

              {job.summary && <p className="timeline-summary">{job.summary}</p>}

              <div className="timeline-columns">
                <div>
                  <h4>Responsibilities</h4>
                  <ul className="check-list">
                    {job.responsibilities.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={16} aria-hidden="true" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Major contributions</h4>
                  <ul className="check-list star-list">
                    {job.contributions.map((item) => (
                      <li key={item}>
                        <Star size={16} aria-hidden="true" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="tag-row" aria-label="Technologies">
                {job.technologies.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </article>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
