"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const management = [
  {
    name: "David Emeka",
    position: "Head of Sales",
    image: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=300&h=400"
  },
  {
    name: "Fatima Bello",
    position: "Head of Marketing",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=400"
  },
  {
    name: "Robert Nnamdi",
    position: "Head of Engineering",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=400"
  },
  {
    name: "Aisha Yakubu",
    position: "Head of Human Resources",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300&h=400"
  }
];

export function ManagementSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Management Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our dedicated management professionals ensuring operational excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {management.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <motion.div
                  className="absolute inset-0 rounded-lg ring-4 ring-[#ffbb00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.02 }}
                />
                
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-[#ffbb00] transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground mt-1">
                    {member.position}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}