"use client";

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const letterVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: {
    x: -20,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

const boxVariants = {
  hidden: { x: '-100%', skewX: -10 },
  visible: {
    x: 0,
    skewX: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  rounded: {
    borderRadius: '20px',
    transition: {
      duration: 0.4,
      delay: 0.5,
    }
  },
  straight: {
    borderRadius: '0px',
    transition: {
      duration: 0.3,
    }
  },
  exit: {
    x: '100%',
    skewX: 10,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
};

export function LoadingScreen() {
  const text = "Task";

  return (
    <motion.div
      className="fixed inset-0 bg-background z-[100] flex items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className="relative flex items-center justify-center">
        <motion.div
          className="absolute bg-primary"
          style={{ width: '150%', height: '120%' }}
          variants={boxVariants}
          animate={["visible", "rounded", "straight"]}
          exit="exit"
        />
        <motion.div className="relative flex overflow-hidden">
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              className="text-5xl font-bold text-primary-foreground"
              style={{
                display: 'inline-block',
                padding: '0 2px'
              }}
              variants={letterVariants}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
