'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface AnimateWhenVisibleProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'left' | 'right';
  className?: string;
}

const AnimateWhenVisible = ({ children, delay = 0, direction, className = "" }: AnimateWhenVisibleProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        opacity: 1,
        transition: {
          duration: 0.5,
          delay: delay,
        },
      });
    }
  }, [controls, inView, delay]);

  const initialX = direction === 'left' ? -50 : direction === 'right' ? 50 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ x: initialX, opacity: 0 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateWhenVisible; 