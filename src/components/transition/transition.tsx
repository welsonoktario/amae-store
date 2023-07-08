import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const variants = {
  out: {
    opacity: 0,
    height: '100%',
    y: 40,
    transition: {
      duration: 0.5,
    },
  },
  in: {
    opacity: 1,
    height: '100%',
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};

const Transition = ({ children }: { children: ReactNode }) => {
  const { asPath } = useRouter();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="custom-transition">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={asPath}
          variants={!shouldReduceMotion ? variants : undefined}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Transition;
