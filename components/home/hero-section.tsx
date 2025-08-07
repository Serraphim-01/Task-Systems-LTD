"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { VideoHero } from "./video-hero";
import { useMediaQuery } from "@/hooks/use-media-query";

const heroSlides = [
  {
    title: "POWER YOUR BUSINESS WITH OUR",
    subtitle: "ENTERPRISE SOLUTIONS",
    image: "/slider/Slider-1.png",
  },
  {
    title: "YOUR TRUSTED PARTNER IN",
    subtitle: "DIGITAL TRANSFORMATION",
    image: "/slider/Slider-2.png",
  },
  {
    title: "DELIVERING EXCELLENCE IN",
    subtitle: "EVERY SOLUTION",
    image: "/slider/Slider-3.png",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isDesktop) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isDesktop]);

  return (
    <section className="relative h-[85vh] max-h-[800px] flex items-center justify-center overflow-hidden">
      {isDesktop ? (
        <VideoHero />
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                fill
                style={{ objectFit: "cover" }}
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-black/50" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left max-w-s">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <h1 className="text-2xl md:text-3xl lg:text-3xl font-bold text-[#fff] leading-tight">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <h2 className="text-5xl md:text-6xl lg:text-6xl font-bold text-[#ffbb00]">
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
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
