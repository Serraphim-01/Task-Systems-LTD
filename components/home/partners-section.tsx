"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the type for a single partner
interface Partner {
  id: number;
  name: string;
  logo_path: string | null;
  // Add other properties from your partners table if needed
}

// Define the props for the PartnersSection component
interface PartnersSectionProps {
  partners: Partner[];
}

export function PartnersSection({ partners: initialPartners }: PartnersSectionProps) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  useEffect(() => {
    // Duplicate partners to create a seamless loop effect
    // We need at least ~12-15 partners for a good visual loop on larger screens.
    let extendedPartners = [...initialPartners];
    while (extendedPartners.length > 0 && extendedPartners.length < 15) {
      extendedPartners = [...extendedPartners, ...initialPartners];
    }
    setPartners(extendedPartners);
  }, [initialPartners]);

  const marqueeVariants = {
    animate: {
      x: [0, -1035],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    },
  };

  if (!partners || partners.length === 0) {
    return null; // Don't render the section if there are no partners
  }

  return (
    <section className="py-16 bg-muted overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
        <div className="relative h-24">
          <motion.div
            className="absolute flex"
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
      </div>
    </section>
  );
}