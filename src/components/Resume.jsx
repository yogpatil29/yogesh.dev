import { FileText } from 'lucide-react';
import { profile, resume } from '../data/portfolio.js';
import useResumeAvailable from '../hooks/useResumeAvailable.js';
import ResumeButton from './ResumeButton.jsx';
import { Reveal } from './ui.jsx';

export default function Resume() {
  const available = useResumeAvailable();

  return (
    <section id="resume" className="section section-tight" aria-labelledby="resume-title">
      <div className="container">
        <Reveal className="resume-banner glass">
          <div className="resume-icon" aria-hidden="true">
            <FileText size={34} />
          </div>
          <div className="resume-copy">
            <p className="eyebrow">For recruiters &amp; hiring managers</p>
            <h2 id="resume-title">Get my resume</h2>
            <p>{resume.message}</p>
            {resume.lastUpdated && <p className="resume-updated">Last updated: {resume.lastUpdated}</p>}
            {available === false && (
              <p className="resume-missing" role="status">
                The resume file isn&apos;t uploaded yet — email me at{' '}
                <a href={`mailto:${profile.email}`}>{profile.email}</a> and I&apos;ll send it right over.
              </p>
            )}
          </div>
          <div className="resume-actions">
            <ResumeButton />
            {available && (
              <a className="btn btn-ghost" href={resume.path} target="_blank" rel="noreferrer">
                View in browser
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
