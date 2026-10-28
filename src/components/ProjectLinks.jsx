import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons.jsx';
import { Placeholder } from './ui.jsx';

/** GitHub / Live Demo buttons; each is hidden while its URL is empty. */
export default function ProjectLinks({ links }) {
  if (!links.github && !links.live) {
    return <Placeholder>GitHub / Live Demo URLs</Placeholder>;
  }
  return (
    <>
      {links.github && (
        <a className="btn btn-ghost btn-sm" href={links.github} target="_blank" rel="noreferrer">
          <GithubIcon size={16} /> GitHub
        </a>
      )}
      {links.live && (
        <a className="btn btn-ghost btn-sm" href={links.live} target="_blank" rel="noreferrer">
          <ExternalLink size={16} aria-hidden="true" /> Live Demo
        </a>
      )}
    </>
  );
}
