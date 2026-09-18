import { motion } from 'framer-motion';

export default function TapFeedback({ children, className = '' }) {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 600, damping: 15 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}