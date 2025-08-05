"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const solutionTabs = [
  {
    id: 'network',
    title: 'Network Solutions',
    content: 'Our comprehensive network solutions provide robust, scalable, and secure connectivity infrastructure tailored to meet your organization\'s specific requirements. From LAN/WAN implementation to advanced routing and switching solutions.',
    image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'mobility',
    title: 'Enterprise Mobility',
    content: 'Enable your workforce with secure mobile device management, application deployment, and enterprise mobility solutions that enhance productivity while maintaining security compliance.',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'convergence',
    title: 'Convergence Solutions',
    content: 'Integrate voice, video, and data communications into unified platforms that streamline operations and reduce infrastructure complexity while improving efficiency.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'collaboration',
    title: 'Collaboration Solutions',
    content: 'Modern collaboration tools including video conferencing, unified communications, and team collaboration platforms that connect your distributed workforce seamlessly.',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'security',
    title: 'Security Solutions',
    content: 'Comprehensive cybersecurity solutions including network security, endpoint protection, threat detection, and compliance management to safeguard your digital assets.',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'applications',
    title: 'Enterprise Applications',
    content: 'Custom enterprise applications and software solutions designed to optimize business processes, improve efficiency, and drive digital transformation initiatives.',
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'support',
    title: 'Managed Support',
    content: '24/7 professional support services including system monitoring, maintenance, troubleshooting, and proactive management to ensure optimal system performance.',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    content: 'Scalable cloud infrastructure, migration services, and cloud-native solutions that provide flexibility, cost-efficiency, and enhanced business continuity.',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  }
];

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState('network');

  const activeSolution = solutionTabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[#ffbb00]/10 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Solutions
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive ICT solutions designed to power your business transformation and drive sustainable growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-border">
            {solutionTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium rounded-t-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#ffbb00] text-black border-b-2 border-[#ffbb00]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                {activeSolution?.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {activeSolution?.content}
              </p>
            </div>

            <div className="relative w-full max-h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src={activeSolution?.image || ''}
                alt={activeSolution?.title || ''}
                width={1200}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}