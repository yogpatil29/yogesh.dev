import { motion } from 'framer-motion';
import { Download, Mail } from 'lucide-react';
import { profile, resume } from '../data/portfolio.js';
import useResumeAvailable from '../hooks/useResumeAvailable.js';

/**
 * Downloads the resume PDF when it exists. If the file is missing, falls back to
 * a "request by email" link instead of a broken download.
 */
export default function ResumeButton({ className = 'btn btn-primary', label = 'Download Resume', compact = false }) {
  const available = useResumeAvailable();

  if (available === false) {
    return (
      <motion.a
        className={className}
        href={`mailto:${profile.email}?subject=${encodeURIComponent('Resume request')}`}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        title="Resume file not uploaded yet — request it by email"
      >
        <Mail size={compact ? 16 : 18} aria-hidden="true" />
        {compact ? 'Request Resume' : 'Request Resume by Email'}
      </motion.a>
    );
  }

  return (
    <motion.a
      className={className}
      href={resume.path}
      download={resume.downloadName}
      aria-disabled={available === null ? 'true' : undefined}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
    >
      <Download size={compact ? 16 : 18} aria-hidden="true" />
      {label}
    </motion.a>
  );
}
