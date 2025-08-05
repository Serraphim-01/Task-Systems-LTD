"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const heroSlides = [
  {
    title: "POWER YOUR BUSINESS WITH OUR:",
    subtitle: "ENTERPRISE SOLUTIONS",
    background: "linear-gradient(135deg, #ffbb00 0%, #ff8800 100%)"
  },
  {
    title: "YOUR TRUSTED PARTNER IN:",
    subtitle: "DIGITAL TRANSFORMATION",
    background: "linear-gradient(135deg, #000000 0%, #333333 100%)"
  },
  {
    title: "DELIVERING EXCELLENCE IN:",
    subtitle: "EVERY SOLUTION",
    background: "linear-gradient(135deg, #ffbb00 0%, #cc9900 100%)"
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ background: heroSlides[currentSlide].background }}
        />
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white/90">
                {heroSlides[currentSlide].subtitle}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}