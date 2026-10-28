import { useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import Background from './components/Background.jsx';
import Cursor from './components/Cursor.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import Services from './components/Services.jsx';
import Education from './components/Education.jsx';
import Resume from './components/Resume.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  // Support deep links like /#contact: the browser's own hash scroll runs before React renders.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    // reducedMotion="user" makes every Framer Motion animation honour the OS setting.
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Background />
      <Cursor />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Education />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
