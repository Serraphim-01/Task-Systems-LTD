"use client";
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Events
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Join us at our upcoming events and connect with our team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center justify-center text-center bg-card border border-border rounded-lg p-12"
        >
          <Calendar className="h-24 w-24 text-primary/50 mb-6" />
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Stay Tuned for Upcoming Events
          </h2>
          <p className="text-muted-foreground max-w-md">
            We are busy planning our next event. Check back soon for details about webinars, workshops, and conferences.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
