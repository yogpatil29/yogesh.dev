import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Soft glowing ring that trails the pointer. Desktop (fine pointer) only, disabled
 * for reduced motion. The native cursor stays visible so usability is unaffected.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.6 });

  useEffect(() => {
    const query = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setHovering(Boolean(event.target.closest?.('a, button, [role="button"], input, textarea, select')));
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener('pointermove', handleMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handleLeave);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="cursor-ring"
      aria-hidden="true"
      style={{ x: springX, y: springY }}
      animate={{ scale: hovering ? 1.8 : 1, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    />
  );
}
