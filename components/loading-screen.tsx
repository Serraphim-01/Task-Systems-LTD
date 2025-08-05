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
    borderRadius: '20px',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  straight: {
    borderRadius: '0px',
    transition: {
      duration: 0.3,
      delay: 0.5,
    }
  },
  exit: {
    x: '100%',
    skewX: 10,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
      delay: 0.2,
    },
  },
};

const circuitLineVariants = {
    initial: {
        pathLength: 0,
    },
    animate: (i: number) => ({
        pathLength: 1,
        transition: {
            duration: 0.5,
            delay: i * 0.2 + 0.5,
            ease: "easeInOut",
        }
    }),
    exit: {
        pathLength: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        }
    }
};

const CircuitLines = () => {
    const lines = [
        { d: "M-50 0 L-20 0", i: 0 },
        { d: "M-50 20 L-20 20 L-20 0", i: 1 },
        { d: "M-50 -20 L-20 -20 L-20 0", i: 2 },
        { d: "M150 0 L120 0", i: 0 },
        { d: "M150 20 L120 20 L120 0", i: 1 },
        { d: "M150 -20 L120 -20 L120 0", i: 2 },
    ];

    return (
        <motion.svg
            width="200"
            height="100"
            viewBox="-50 -50 200 100"
            className="absolute"
            initial="initial"
            animate="animate"
            exit="exit"
        >
            {lines.map(line => (
                <motion.path
                    key={line.d}
                    d={line.d}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    fill="none"
                    variants={circuitLineVariants}
                    custom={line.i}
                />
            ))}
        </motion.svg>
    )
}


export function LoadingScreen() {
  const text = "Task";

  return (
    <motion.div
      className="fixed inset-0 bg-background z-[100] flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
        <CircuitLines />
      <motion.div className="relative flex items-center justify-center">
        <motion.div
          className="absolute bg-primary"
          style={{ width: '150%', height: '120%' }}
          variants={boxVariants}
          animate={["visible", "straight"]}
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
