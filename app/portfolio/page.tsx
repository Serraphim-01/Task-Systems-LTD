"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star } from 'lucide-react';

const portfolioTabs = [
  {
    id: 'achievements',
    title: 'Achievements',
    icon: Trophy,
    content: `Over three decades of excellence in the ICT industry, Task Systems has achieved numerous milestones that demonstrate our commitment to delivering world-class solutions. We have successfully implemented over 500 enterprise-level projects across Nigeria and Sub-Saharan Africa, serving clients in critical sectors including Oil & Gas, Banking, Telecommunications, Manufacturing, and Public sector organizations.

Our achievements include being recognized as a Microsoft Gold Partner, Cisco Premier Partner, and maintaining ISO 9001:2015 certification for quality management systems. We have consistently delivered projects on time and within budget, maintaining a 98% client satisfaction rate and establishing long-term partnerships with leading global technology vendors.

Key achievements include the successful deployment of nationwide network infrastructure for major telecommunications providers, implementation of core banking systems for tier-1 financial institutions, and development of custom enterprise applications that have transformed business operations for our clients.`
  },
  {
    id: 'awards',
    title: 'Awards',
    icon: Award,
    content: `Task Systems has been honored with multiple industry awards and recognitions that validate our expertise and commitment to excellence in ICT solutions delivery.

Awards and Recognitions:
• ICT Company of the Year - Nigeria Technology Awards 2023
• Excellence in System Integration - West Africa ICT Awards 2022
• Best Enterprise Solutions Provider - Lagos Business Excellence Awards 2021
• Innovation in Digital Transformation - Nigeria ICT Innovation Awards 2020
• Outstanding Partnership Award - Microsoft Nigeria 2019
• Cisco Partner of Excellence Award - West Africa Region 2018

These awards reflect our dedication to innovation, quality service delivery, and our role as a trusted technology partner. Our recognition by industry peers and clients alike demonstrates our consistent ability to exceed expectations and deliver solutions that drive business success.`
  },
  {
    id: 'references',
    title: 'References',
    icon: Star,
    content: `Task Systems has built strong relationships with leading organizations across various industries. Our client references span multiple sectors and include some of the most respected names in Nigerian and Sub-Saharan business.

Banking & Financial Services:
Our solutions have powered critical operations for major commercial banks, enabling secure transaction processing, regulatory compliance, and digital banking transformation initiatives.

Oil & Gas Sector:
We have implemented robust ICT infrastructure for upstream, midstream, and downstream operations, supporting mission-critical applications in challenging environments.

Telecommunications:
Our network solutions and managed services have enabled telecommunications providers to deliver reliable services to millions of subscribers across the region.

Manufacturing & Industrial:
We have modernized operations for manufacturing companies through enterprise resource planning systems, industrial automation solutions, and supply chain optimization platforms.

Public Sector:
Our e-governance solutions have enhanced service delivery for government agencies, improving citizen engagement and operational efficiency.

All our client relationships are built on trust, transparency, and proven results. We maintain confidentiality agreements that protect our clients' sensitive information while demonstrating our capability through successful project outcomes.`
  }
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('achievements');

  const activeContent = portfolioTabs.find(tab => tab.id === activeTab);

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
              Our Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our achievements, awards, and client references that showcase our expertise and commitment to excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabbed Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 border-b border-border">
            {portfolioTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 text-lg font-medium rounded-t-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#ffbb00] text-black border-b-2 border-[#ffbb00]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
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
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card rounded-lg p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                <activeContent.icon className="h-8 w-8 text-primary" />
                {activeContent?.title}
              </h2>
              <div className="prose prose-lg max-w-none">
                {activeContent?.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}