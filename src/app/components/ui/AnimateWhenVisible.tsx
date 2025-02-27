'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface AnimateWhenVisibleProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimateWhenVisible = ({ children, delay = 0, className = "" }: AnimateWhenVisibleProps) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateWhenVisible; 