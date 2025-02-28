'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimateWhenVisibleProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimateWhenVisible: React.FC<AnimateWhenVisibleProps> = ({ 
  children, 
  delay = 0.2 
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.17, 0.55, 0.55, 1]
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateWhenVisible; 