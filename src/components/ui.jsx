import { motion } from 'framer-motion';

const easeOut = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Reveals its children once when scrolled into view. */
export function Reveal({ children, as = 'div', delay = 0, className, ...props }) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: fadeUp.hidden,
        visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay } },
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Section({ id, eyebrow, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-title`} className="section-title">
            {title}
          </h2>
          {intro && <p className="section-intro">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/**
 * Marks content that still needs to be filled in from src/data/portfolio.js.
 * Visible in development only; renders nothing in the production build.
 */
export function Placeholder({ children }) {
  if (!import.meta.env.DEV) return null;
  return (
    <span className="placeholder" title="Shown in development only — edit src/data/portfolio.js">
      Placeholder: {children}
    </span>
  );
}

export function Tag({ children }) {
  return <span className="tag">{children}</span>;
}
