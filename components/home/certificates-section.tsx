'use client';

import { motion } from 'framer-motion';
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

        {certificates.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, staggerChildren: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-center items-center"
            >
              {certificates.map((certificate, index) => (
                <motion.div
                  key={`${certificate.id}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative group cursor-pointer mx-auto max-w-sm"
                >
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg bg-white">
                    <Image
                      src={certificate.image_path}
                      alt={certificate.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
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
        ) : (
            <div className="text-center text-muted-foreground">
                <p>No certificates to display at this time.</p>
            </div>
        )}
      </div>
    </section>
  );
}
