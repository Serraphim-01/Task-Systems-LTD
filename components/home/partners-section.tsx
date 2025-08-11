"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { partners } from "@/lib/data/partners";

export function PartnersSection() {
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
            Our Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Collaborating with industry leaders to deliver world-class solutions
          </p>
        </motion.div>

        <div className="relative overflow-hidden group">
          <motion.div
            className="flex space-x-12"
            animate={{
              x: [0, -2500],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear",
              },
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <Link
                href={`/partner/${partner.name.toLowerCase().replace(/ /g, "-")}`}
                key={`${partner.name}-${index}`}
                className="group relative flex-shrink-0 w-32 h-32 flex items-center justify-center bg-background rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden p-2">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center text-xs py-1 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.name}
                </div>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Mobile scroll hint */}
        <p className="text-center text-sm text-muted-foreground mt-6 md:hidden">
          Scroll horizontally to see all partners
        </p>
      </div>
    </section>
  );
}