'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type Certificate = {
  id: number;
  title: string;
  image_path: string;
};

type CertificatesSectionProps = {
  certificates: Certificate[];
};

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSlideshow = certificates.length > 3;
  const numPages = Math.ceil(certificates.length / 3);

  useEffect(() => {
    if (!isSlideshow) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        const currentPage = Math.floor(prev / 3);
        const nextPage = (currentPage + 1) % numPages;
        return nextPage * 3;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [isSlideshow, numPages]);

  const getSlidesForCurrentView = () => {
    if (!isSlideshow) {
      return certificates;
    }
    const slides = [];
    for (let i = 0; i < 3; i++) {
      const index = currentIndex + i;
      if (index < certificates.length) {
        slides.push(certificates[index]);
      }
    }
    return slides;
  };

  const slidesToDisplay = getSlidesForCurrentView();

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Certificates
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We are certified by the world's leading technology partners, ensuring the highest standards of quality and expertise.
          </p>
        </motion.div>

        <div className={`relative ${isSlideshow ? 'overflow-hidden' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: isSlideshow ? 100 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSlideshow ? -100 : 0 }}
              transition={{ duration: 0.8 }}
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${!isSlideshow ? 'justify-center' : ''}`}
            >
              {slidesToDisplay.map((certificate, index) => (
                <motion.div
                  key={`${certificate.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative group cursor-pointer mx-auto ${!isSlideshow ? 'max-w-sm' : ''}`}
                >
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-white">
                    <Image
                      src={certificate.image_path}
                      alt={certificate.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      className="object-contain p-4"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <h3 className="text-lg font-bold text-white text-center">
                        {certificate.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {isSlideshow && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: numPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / 3) === index
                    ? "bg-[#ffbb00]"
                    : "bg-border"
                }`}
                aria-label={`Go to slide group ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
