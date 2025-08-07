"use client";

import { motion, easeInOut } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: easeInOut },
  },
};

const logoVariants = {
  hidden: { x: "-100vw", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      type: "spring",
      stiffness: 50,
    },
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
  exit: {
    x: "100vw",
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
};

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-background z-[100] flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        variants={logoVariants}
        initial="hidden"
        animate={["visible", "pulse"]}
        exit="exit"
      >
        <Image
          src="/task-logo.png"
          alt="Task Systems Logo"
          width={200}
          height={80}
          priority
        />
      </motion.div>
    </motion.div>
  );
}
