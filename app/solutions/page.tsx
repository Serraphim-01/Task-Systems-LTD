"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronDown, Globe, Smartphone, Zap, Users, Shield, Code, LifeBuoy, Cloud } from 'lucide-react';

const solutionTabs = [
  {
    id: 'network',
    title: 'Network Solutions',
    icon: Globe,
    content: 'Our comprehensive network solutions provide robust, scalable, and secure connectivity infrastructure tailored to meet your organization\'s specific requirements. From LAN/WAN implementation to advanced routing and switching solutions.',
    image: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'mobility',
    title: 'Enterprise Mobility',
    icon: Smartphone,
    content: 'Enable your workforce with secure mobile device management, application deployment, and enterprise mobility solutions that enhance productivity while maintaining security compliance.',
    image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'convergence',
    title: 'Convergence Solutions',
    icon: Zap,
    content: 'Integrate voice, video, and data communications into unified platforms that streamline operations and reduce infrastructure complexity while improving efficiency.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'collaboration',
    title: 'Collaboration Solutions',
    icon: Users,
    content: 'Modern collaboration tools including video conferencing, unified communications, and team collaboration platforms that connect your distributed workforce seamlessly.',
    image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'security',
    title: 'Security Solutions',
    icon: Shield,
    content: 'Comprehensive cybersecurity solutions including network security, endpoint protection, threat detection, and compliance management to safeguard your digital assets.',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'applications',
    title: 'Enterprise Applications',
    icon: Code,
    content: 'Custom enterprise applications and software solutions designed to optimize business processes, improve efficiency, and drive digital transformation initiatives.',
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'support',
    title: 'Managed Support',
    icon: LifeBuoy,
    content: '24/7 professional support services including system monitoring, maintenance, troubleshooting, and proactive management to ensure optimal system performance.',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    icon: Cloud,
    content: 'Scalable cloud infrastructure, migration services, and cloud-native solutions that provide flexibility, cost-efficiency, and enhanced business continuity.',
    image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400'
  }
];

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState('network');
  const [expandedMobile, setExpandedMobile] = useState<string | null>('network');
  const searchParams = useSearchParams();
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tabId = searchParams.get('tab');
    if (tabId && solutionTabs.some(tab => tab.id === tabId)) {
      setActiveTab(tabId);
      setExpandedMobile(tabId);
      setTimeout(() => {
        tabsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [searchParams]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    tabsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeSolution = solutionTabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-8 bg-gradient-to-r from-[#ffbb00]/10 to-transparent">
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
            <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive ICT solutions designed to power your business transformation and drive sustainable growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="py-8 scroll-mt-[4.5rem]" ref={tabsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation - Desktop */}
          <div className="hidden md:flex flex-wrap justify-center gap-2 mb-12 border-b border-border">
            {solutionTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#ffbb00] text-black border-b-2 border-[#ffbb00]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.title}
              </button>
            ))}
          </div>

          {/* Tab Content - Desktop */}
          <div className="hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
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
                <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src={activeSolution?.image || ''}
                    alt={activeSolution?.title || ''}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Accordion Content - Mobile */}
          <div className="md:hidden space-y-4">
            {solutionTabs.map((tab) => (
              <div key={tab.id} className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedMobile(expandedMobile === tab.id ? null : tab.id)}
                  className="w-full flex justify-between items-center p-4 bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <tab.icon className="h-5 w-5 text-primary" />
                    <span className="font-semibold">{tab.title}</span>
                  </div>
                  <ChevronDown className={`transform transition-transform duration-300 ${expandedMobile === tab.id ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {expandedMobile === tab.id && (
                    <motion.div
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-4">
                        <p className="text-muted-foreground">{tab.content}</p>
                        <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={tab.image}
                            alt={tab.title}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}