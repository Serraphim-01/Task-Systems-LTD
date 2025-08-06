"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const management = [
  {
    name: "Gozy Ijogun",
    position: "CEO",
    image: "/directors_management/CEO-GOZY IJOGUN.jpg"
  },
  {
    name: "Eky Ovie-Fidelis",
    position: "General Manager",
    image: "/directors_management/GM_EKY-OVIE-FIDELIS.png"
  },
  {
    name: "Charles Adigwe",
    position: "Executive Director",
    image: "/directors_management/ED-Head of Operations.png"
  },
  {
    name: "Henrietta Onyebuchi-Akobi",
    position: "CFO",
    image: "/directors_management/CFO- Henrietta Onyebuchi-Akobi.png"
  },
  {
    name: "Ifeoma Chigbo-Ndukwe",
    position: "HR Manager",
    image: "/directors_management/Head-HR_Ifeoma-Chigbo-Ndukwe.jpg"
  },
  {
    name: "Ugonna Onyido-Okoro",
    position: "Compliance Manager",
    image: "/directors_management/COMPLIANCE- Ugonna Onyido-Okoro.png"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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