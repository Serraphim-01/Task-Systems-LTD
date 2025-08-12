"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

// Define the type for a single partner
interface Partner {
  id: number;
  name: string;
  link: string;
  logo_path: string | null;
}

// Define the props for the PartnersSection component
interface PartnersSectionProps {
  partners: Partner[];
}

export function PartnersSection({ partners: initialPartners }: PartnersSectionProps) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState(30);

  useLayoutEffect(() => {
    if (initialPartners.length > 0) {
      let extendedPartners = [...initialPartners];
      if (marqueeRef.current) {
        // Calculate how many partners fit on screen
        const containerWidth = marqueeRef.current.offsetWidth;
        const partnerWidth = 160; // Approx width of one partner item (w-24 + mx-8*2)
        const partnersNeeded = Math.ceil(containerWidth / partnerWidth) + 2;

        while (extendedPartners.length < partnersNeeded) {
          extendedPartners = [...extendedPartners, ...initialPartners];
        }
      }
      // For a seamless loop, we need at least one full set of duplicates
      setPartners([...extendedPartners, ...extendedPartners]);

      // Adjust animation speed based on number of items
      const newDuration = extendedPartners.length * 2.5;
      setAnimationDuration(Math.max(30, newDuration));
    }
  }, [initialPartners]);

  const marqueeVariants = {
    animate: {
      x: [0, - (partners.length / 2) * 160], // Animate by half the total width
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: animationDuration,
          ease: "linear",
        },
      },
    },
  };

  if (!initialPartners || initialPartners.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
        <div className="w-full overflow-hidden" ref={marqueeRef}>
          <motion.div
            className="flex"
            variants={marqueeVariants}
            animate="animate"
          >
            {partners.map((partner, index) => {
              if (!partner.logo_path) return null;
              const logoUrl = `${supabaseUrl}/storage/v1/object/public/images/${partner.logo_path}`;

              return (
                <Link
                  href={`/partner/${encodeURIComponent(partner.name)}`}
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center w-24 h-24"
                  title={partner.name}
                >
                  <div className="w-24 h-24 rounded-full bg-background p-3 shadow-md flex items-center justify-center transition-transform hover:scale-110">
                    <Image
                      src={logoUrl}
                      alt={partner.name}
                      width={80}
                      height={80}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </div>
        <div className="text-center mt-12">
            <Link href="/partner/all" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90">
                View All Partners
            </Link>
        </div>
      </div>
    </section>
  );
}