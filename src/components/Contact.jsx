import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Mail, Phone, Send, ShieldCheck } from 'lucide-react';
import { contact, profile, socials } from '../data/portfolio.js';
import { GithubIcon, LinkedinIcon } from './icons.jsx';
import { Reveal } from './ui.jsx';

const emptyForm = { name: '', email: '', subject: '', message: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!emailPattern.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.subject.trim().length < 3) errors.subject = 'Please add a short subject.';
  if (values.message.trim().length < 20) errors.message = 'Please write at least 20 characters.';
  if (values.message.length > 3000) errors.message = 'Please keep your message under 3000 characters.';
  return errors;
}

function buildMailto(values) {
  const body = `${values.message}\n\n— ${values.name} (${values.email})`;
  return `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Sends the form. INTEGRATION POINT: set contact.formEndpoint in src/data/portfolio.js
 * (Formspree, or your own Spring Boot POST /api/contact). Any 2xx response counts as sent.
 */
async function submitMessage(values) {
  const response = await fetch(contact.formEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(values),
  });
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
}

function Field({ id, label, error, as = 'input', ...props }) {
  const Component = as;
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <Component
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  // idle | sending | success | error | not-configured
  const [status, setStatus] = useState('idle');
  const [submittedValues, setSubmittedValues] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
      return;
    }

    setSubmittedValues(values);
    if (!contact.formEndpoint) {
      // No backend connected: be honest and offer the email app instead.
      setStatus('not-configured');
      return;
    }

    setStatus('sending');
    try {
      await submitMessage(values);
      setStatus('success');
      setValues(emptyForm);
    } catch {
      setStatus('error');
    }
  };

  const channels = [
    { icon: <Mail size={20} aria-hidden="true" />, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    socials.linkedin && {
      icon: <LinkedinIcon />,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: socials.linkedin,
      external: true,
    },
    socials.github && {
      icon: <GithubIcon />,
      label: 'GitHub',
      value: socials.github.replace(/^https?:\/\/(www\.)?/, ''),
      href: socials.github,
      external: true,
    },
    profile.showPhone &&
      profile.phone && {
        icon: <Phone size={20} aria-hidden="true" />,
        label: 'Phone',
        value: profile.phone,
        href: `tel:${profile.phone.replace(/\s+/g, '')}`,
      },
  ].filter(Boolean);

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="section-head">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="section-title contact-title">
            {contact.heading}
          </h2>
          <p className="section-intro">{contact.subheading}</p>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-channels">
            {channels.map((channel) => (
              <motion.a
                key={channel.label}
                href={channel.href}
                className="channel glass card-hover"
                target={channel.external ? '_blank' : undefined}
                rel={channel.external ? 'noreferrer' : undefined}
                whileHover={{ x: 4 }}
              >
                <span className="icon-badge">{channel.icon}</span>
                <span>
                  <span className="channel-label">{channel.label}</span>
                  <span className="channel-value">{channel.value}</span>
                </span>
              </motion.a>
            ))}
            <p className="privacy-note">
              <ShieldCheck size={16} aria-hidden="true" /> {contact.privacyNote}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form className="contact-form glass" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <Field id="name" label="Name" autoComplete="name" value={values.name} onChange={handleChange} error={errors.name} />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>
              <Field id="subject" label="Subject" value={values.subject} onChange={handleChange} error={errors.subject} />
              <Field
                id="message"
                label="Message"
                as="textarea"
                rows={6}
                value={values.message}
                onChange={handleChange}
                error={errors.message}
              />

              <motion.button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={status === 'sending'}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={18} className="spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    <Send size={18} aria-hidden="true" /> Send Message
                  </>
                )}
              </motion.button>

              <div aria-live="polite">
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.p key="success" className="form-status is-success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <CheckCircle2 size={18} aria-hidden="true" /> Thanks! Your message was sent — I&apos;ll get back to you soon.
                    </motion.p>
                  )}
                  {status === 'error' && submittedValues && (
                    <motion.p key="error" className="form-status is-error" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <AlertCircle size={18} aria-hidden="true" /> Sorry, your message could not be sent. Please try again or{' '}
                      <a href={buildMailto(submittedValues)}>email me directly</a>.
                    </motion.p>
                  )}
                  {status === 'not-configured' && submittedValues && (
                    <motion.p key="not-configured" className="form-status is-info" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                      <AlertCircle size={18} aria-hidden="true" /> Online sending isn&apos;t set up yet, so your message has{' '}
                      <strong>not</strong> been sent.{' '}
                      <a href={buildMailto(submittedValues)}>Open it in your email app</a> to send it to {profile.email}.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
