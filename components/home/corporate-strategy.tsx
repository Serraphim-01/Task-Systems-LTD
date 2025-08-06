"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const solutions = [
  {
    id: 1,
    title: "Network Solutions",
    description: "Our robust network solutions ensure seamless connectivity and communication for your business, enhancing productivity and efficiency. We provide scalable and secure network infrastructure tailored to your specific needs.",
    image: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 2,
    title: "Cloud Solutions",
    description: "Leverage the power of the cloud with our comprehensive cloud solutions. We offer cloud migration, management, and optimization services to help you build a flexible and scalable IT environment.",
    image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 3,
    title: "Security Solutions",
    description: "Protect your digital assets with our advanced security solutions. We provide end-to-end security services, including threat detection, risk management, and compliance, to safeguard your business from cyber threats.",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 4,
    title: "Enterprise Mobility",
    description: "Empower your workforce with our enterprise mobility solutions. We help you create a mobile-first strategy that enhances productivity, collaboration, and access to critical business information anytime, anywhere.",
    image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 5,
    title: "Collaboration Solutions",
    description: "Foster teamwork and innovation with our collaboration solutions. We provide tools and platforms that enable seamless communication and information sharing across your organization.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: 6,
    title: "Managed Support",
    description: "Focus on your core business while we manage your IT infrastructure. Our managed support services provide proactive monitoring, maintenance, and support to ensure your systems are always running at peak performance.",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

export function CorporateStrategy() {
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
            Corporate Strategy
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive ICT solutions tailored to meet your business needs
          </p>
        </motion.div>

        <div className="space-y-16">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="text-2xl font-bold text-foreground mb-4">{solution.title}</h3>
                <p className="text-muted-foreground">{solution.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}