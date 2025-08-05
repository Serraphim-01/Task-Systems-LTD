"use client";
import { motion } from 'framer-motion';

export default function ReachUsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Reach Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with our team for all your ICT solution needs.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}