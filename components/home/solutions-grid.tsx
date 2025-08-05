"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Network, 
  Smartphone, 
  Merge, 
  Users, 
  Shield, 
  Cloud,
  Headphones,
  Server
} from 'lucide-react';

const solutions = [
  {
    title: "Network Solution",
    icon: Network,
    description: "Comprehensive network infrastructure and connectivity solutions"
  },
  {
    title: "Convergence Solutions",
    icon: Merge,
    description: "Unified communications and integrated technology platforms"
  },
  {
    title: "Managed Support",
    icon: Headphones,
    description: "24/7 professional support and maintenance services"
  },
  {
    title: "Cloud Solutions",
    icon: Cloud,
    description: "Scalable cloud infrastructure and migration services"
  },
  {
    title: "Security Solutions",
    icon: Shield,
    description: "Advanced cybersecurity and data protection systems"
  },
  {
    title: "Collaboration Solutions",
    icon: Users,
    description: "Modern collaboration tools and unified communications"
  }
];

export function SolutionsGrid() {
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
            Complete ICT Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From network infrastructure to cloud solutions, we provide end-to-end technology services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href="/solutions" className="block group">
                  <div className="bg-background rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:transform group-hover:scale-105">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-[#ffbb00]/10 rounded-lg flex items-center justify-center group-hover:bg-[#ffbb00]/20 transition-colors duration-300">
                          <Icon className="h-6 w-6 text-[#ffbb00]" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-[#ffbb00] transition-colors duration-300">
                          {solution.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}