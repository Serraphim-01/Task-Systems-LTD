"use client";

import { motion } from 'framer-motion';

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
              poster="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg"
            >
              <source src="/video-placeholder.mp4" type="video/mp4" />
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
              Founded in 1987, Task Systems has grown to become a leading indigenous system integration company, 
              providing cutting-edge ICT solutions to a diverse clientele across Nigeria and the broader 
              Sub-Saharan market.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With over three decades of industry experience, we pride ourselves on our unwavering commitment 
              to excellence, making us the preferred partner for businesses seeking robust and innovative 
              technology solutions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}