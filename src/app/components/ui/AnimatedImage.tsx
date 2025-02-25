'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AnimatedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

export default function AnimatedImage({
  src,
  alt,
  width,
  height,
  className = '',
  delay = 0.3,
  hoverEffect = true,
}: AnimatedImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      viewport={{ once: true }}
      whileHover={
        hoverEffect
          ? {
              scale: 1.05,
              transition: { duration: 0.3 },
            }
          : undefined
      }
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg shadow-lg"
      />
    </motion.div>
  );
} 