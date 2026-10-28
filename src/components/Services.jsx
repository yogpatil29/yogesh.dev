import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/portfolio.js';
import { DataIcon } from './icons.jsx';
import { Reveal, Section, fadeUp, stagger } from './ui.jsx';

export default function Services() {
  return (
    <Section
      id="services"
      eyebrow="What I can offer"
      title="Let's build your next application"
      intro="For freelance clients and teams who need an extra pair of hands on a Java or React project."
    >
      <motion.ul
        className="services-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger(0.08)}
      >
        {services.map((service, index) => (
          <motion.li key={service.title} className="service-card glass card-hover" variants={fadeUp}>
            <span className="service-number" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="icon-badge">
              <DataIcon name={service.icon} />
            </span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </motion.li>
        ))}
      </motion.ul>

      <Reveal className="center-cta">
        <motion.a href="#contact" className="btn btn-primary" whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
          Discuss Your Project <ArrowRight size={18} aria-hidden="true" />
        </motion.a>
      </Reveal>
    </Section>
  );
}
