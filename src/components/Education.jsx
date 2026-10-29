import { motion } from 'framer-motion';
import { Award, BookOpen, ExternalLink, GraduationCap } from 'lucide-react';
import { certifications, courses, education } from '../data/portfolio.js';
import { Placeholder, Section, fadeUp, stagger } from './ui.jsx';

export default function Education() {
  const hasExtras = certifications.length > 0 || courses.length > 0;

  return (
    <Section id="education" eyebrow="Education" title="Academic background">
      <motion.div
        className="education-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger(0.1)}
      >
        {education.map((item) => (
          <motion.article key={item.degree} className="edu-card glass card-hover" variants={fadeUp}>
            <span className="icon-badge">
              <GraduationCap size={22} aria-hidden="true" />
            </span>
            <p className="edu-period">{item.period}</p>
            <h3>{item.degree}</h3>
            <p className="edu-institution">{item.institution}</p>
            {item.details && <p className="edu-details">{item.details}</p>}
          </motion.article>
        ))}

        {/* {(hasExtras || import.meta.env.DEV) && (
          <motion.article className="edu-card glass card-hover" variants={fadeUp}>
            <span className="icon-badge">
              <Award size={22} aria-hidden="true" />
            </span>
            <h3>Certifications &amp; courses</h3>
            {certifications.length > 0 ? (
              <ul className="cert-list">
                {certifications.map((cert) => (
                  <li key={cert.name}>
                    <strong>{cert.name}</strong>
                    <span>
                      {[cert.issuer, cert.year].filter(Boolean).join(' · ')}
                      {cert.url && (
                        <a href={cert.url} target="_blank" rel="noreferrer" aria-label={`View ${cert.name} credential`}>
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              //<Placeholder>certifications</Placeholder>
              <></>
            )}
            {courses.length > 0 ? (
              <ul className="course-list">
                {courses.map((course) => (
                  <li key={course}>
                    <BookOpen size={14} aria-hidden="true" /> {course}
                  </li>
                ))}
              </ul>
            ) : (
              //<Placeholder>relevant courses</Placeholder>
              <></>
            )}
          </motion.article>
        )} */}
      </motion.div>
    </Section>
  );
}
