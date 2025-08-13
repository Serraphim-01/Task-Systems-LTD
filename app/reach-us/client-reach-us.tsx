"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";

const contactInfo = [
  {
    city: "Lagos",
    address:
      "Yudala Heights Building, 13 Idowu Martins Street, Victoria Island, Lagos.",
    icon: MapPin,
    mapsQuery:
      "Yudala Heights Building, 13 Idowu Martins Street, Victoria Island, Lagos",
  },
  {
    city: "Port Harcourt",
    address: "146 Trans Amadi Industrial Layout, Port Harcourt, Rivers State.",
    icon: MapPin,
    mapsQuery: "146 Trans Amadi Industrial Layout, Port Harcourt, Rivers State",
  },
  {
    city: "Abuja",
    address:
      "20 Port Harcourt Crescent, off Gimbiya Street, Area 11 Garki District, Abuja.",
    icon: MapPin,
    mapsQuery:
      "20 Port Harcourt Crescent, off Gimbiya Street, Area 11 Garki District, Abuja",
  },
  {
    city: "Email",
    address: "engage@tasksystems.com",
    icon: Mail,
    href: "mailto:engage@tasksystems.com",
  },
  {
    city: "Call",
    address: "+234 911 080 8619",
    icon: Phone,
    href: "tel:+2349110808619",
  },
];

export default function ReachUsPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Reach Us
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            We&apos;re here to help and answer any question you might have.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-lg overflow-hidden shadow-xl"
          >
            <div className="relative w-full h-96 md:h-full">
              <Image
                src="/reach-us/location.png"
                alt="Task Systems Office Location"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {contactInfo.map((item, index) => {
              const Icon = item.icon;

              const content = (
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.city}
                    </h3>
                    <p className="text-muted-foreground">{item.address}</p>
                  </div>
                </div>
              );

              // If it's email/phone
              if (item.href) {
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-105 transition-transform duration-200 block"
                  >
                    {content}
                  </a>
                );
              }

              // If it's a physical address with a mapsQuery
              if (item.mapsQuery) {
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  item.mapsQuery
                )}`;
                return (
                  <a
                    key={index}
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:scale-105 transition-transform duration-200 block"
                  >
                    {content}
                  </a>
                );
              }

              return <div key={index}>{content}</div>;
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
