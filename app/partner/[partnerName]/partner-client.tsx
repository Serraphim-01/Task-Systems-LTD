"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Partner } from "@/lib/data/partners";


const PartnerClient = ({ partner }: { partner: Partner }) => {
  return (
    <div className="bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src={partner.logo}
              alt={`${partner.name} logo`}
              width={200}
              height={200}
              className="object-contain rounded-lg shadow-md"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {partner.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {partner.status}
            </p>
            <Link href={partner.link} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="mb-4">
                Visit Website
              </Button>
            </Link>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Services</h2>
              <ul className="list-disc list-inside space-y-1">
                {partner.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PartnerClient;
