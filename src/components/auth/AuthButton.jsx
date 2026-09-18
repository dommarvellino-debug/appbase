import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function AuthButton({ children, loading, disabled, ...props }) {
  return (
    <motion.button
      {...props}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled || loading}
      className="group relative w-full h-12 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 font-medium text-white shadow-lg shadow-indigo-500/30 transition-shadow hover:shadow-xl hover:shadow-indigo-500/40 disabled:opacity-60 disabled:pointer-events-none"
    >
      <span className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
      <span className="relative z-10 flex items-center justify-center">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
}