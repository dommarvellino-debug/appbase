import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AnimatedBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [ripples, setRipples] = useState([]);

  const glowX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const orb1X = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const orb1Y = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const orb2X = useSpring(mouseX, { stiffness: 25, damping: 25 });
  const orb2Y = useSpring(mouseY, { stiffness: 25, damping: 25 });
  const orb3X = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const orb3Y = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const move1X = useTransform(orb1X, (v) => v * 0.08);
  const move1Y = useTransform(orb1Y, (v) => v * 0.08);
  const move2X = useTransform(orb2X, (v) => v * -0.06);
  const move2Y = useTransform(orb2Y, (v) => v * -0.06);
  const move3X = useTransform(orb3X, (v) => v * 0.10);
  const move3Y = useTransform(orb3Y, (v) => v * 0.10);

  useEffect(() => {
    const handleMouse = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleClick = (e) => {
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1200);
    };
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('click', handleClick);
    };
  }, [mouseX, mouseY]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div style={{ x: move1X, y: move1Y }} className="absolute -left-40 -top-40">
        <motion.div
          className="h-[28rem] w-[28rem] rounded-full bg-indigo-400/30 blur-3xl dark:bg-indigo-600/20"
          animate={{ x: [0, 100, 0], y: [0, 80, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      <motion.div style={{ x: move2X, y: move2Y }} className="absolute right-[-10rem] top-1/3">
        <motion.div
          className="h-[26rem] w-[26rem] rounded-full bg-violet-400/30 blur-3xl dark:bg-violet-600/20"
          animate={{ x: [0, -80, 0], y: [0, 100, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
      <motion.div style={{ x: move3X, y: move3Y }} className="absolute bottom-[-10rem] left-1/4">
        <motion.div
          className="h-[24rem] w-[24rem] rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-600/15"
          animate={{ x: [0, 120, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        style={{ left: glowX, top: glowY, translateX: '-50%', translateY: '-50%' }}
        className="absolute h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10"
      />

      <AnimatePresence>
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            style={{ left: r.x, top: r.y, translateX: '-50%', translateY: '-50%' }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute h-32 w-32 rounded-full border-2 border-indigo-400/40 dark:border-indigo-500/30"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}