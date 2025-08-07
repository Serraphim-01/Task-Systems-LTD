"use client";

import { motion } from 'framer-motion';

export function AboutIntro() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              A bit about us
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Task Systems is an indigenous system integration Company founded in 1987.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              For over 30 years, Task Systems has remained the system integrator of choice
              providing ICT Solutions to several clients across the Nigerian and sub-Saharan market.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}