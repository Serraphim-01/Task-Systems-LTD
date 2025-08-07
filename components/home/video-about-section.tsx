"use client";

import { motion } from "framer-motion";

export function VideoAboutSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative aspect-video rounded-lg overflow-hidden shadow-xl"
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster=""
            >
              <source src="/videos/Task systems  Logo Reveal.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black/20"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 1987, Task Systems Ltd has evolved from a pioneering IT
              firm into one of Africa’s foremost System Integrators, driving
              digital transformation, intelligent automation, and AI-powered
              innovation across the continent.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With nearly four decades of unwavering excellence, Task has become
              a trusted name in delivering impactful, scalable, and future-ready
              technology solutions to businesses in multiple sectors.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
