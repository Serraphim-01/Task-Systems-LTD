"use client";
import { motion } from 'framer-motion';
import { Briefcase, Wind } from 'lucide-react';

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Job Openings
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Join our team of innovators and help shape the future of technology in Africa.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center justify-center text-center bg-card border border-border rounded-lg p-12"
        >
          <Wind className="h-24 w-24 text-primary/50 mb-6" />
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Nothing to see here... yet!
          </h2>
          <p className="text-muted-foreground max-w-md">
            There are currently no open positions. Please check back later, or follow us on our social channels for updates on new opportunities.
          </p>
        </motion.div>
      </div>
    </div>
  );
}