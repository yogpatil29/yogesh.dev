import { useEffect, useState } from 'react';
import { resume } from '../data/portfolio.js';

// Shared across components so the file is only checked once per page load.
let availabilityCheck;

function checkResume() {
  if (!resume.path) return Promise.resolve(false);
  availabilityCheck ??= fetch(resume.path, { method: 'HEAD' })
    .then((response) => {
      // Dev servers / SPA hosts may answer a missing file with index.html (200),
      // so also require a PDF content type.
      const type = response.headers.get('content-type') ?? '';
      return response.ok && type.includes('pdf');
    })
    .catch(() => false);
  return availabilityCheck;
}

/** null while checking, then true/false. */
export default function useResumeAvailable() {
  const [available, setAvailable] = useState(null);
  useEffect(() => {
    let cancelled = false;
    checkResume().then((result) => {
      if (!cancelled) setAvailable(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return available;
}
