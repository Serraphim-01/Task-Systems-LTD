"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Star, CheckCircle } from "lucide-react";

const portfolioTabs = [
  {
    id: "achievements",
    title: "Achievements",
    icon: Trophy,
    content: [
        {
            type: 'paragraph',
            text: 'Over three decades of excellence in the ICT industry, Task Systems has achieved numerous milestones that demonstrate our commitment to delivering world-class solutions. We have successfully implemented over 500 enterprise-level projects across Nigeria and Sub-Saharan Africa, serving clients in critical sectors including Oil & Gas, Banking, Telecommunications, Manufacturing, and Public sector organizations.'
        },
        {
            type: 'paragraph',
            text: 'Our achievements include being recognized as a Microsoft Gold Partner, Cisco Premier Partner, and maintaining ISO 9001:2015 certification for quality management systems. We have consistently delivered projects on time and within budget, maintaining a 98% client satisfaction rate and establishing long-term partnerships with leading global technology vendors.'
        },
        {
            type: 'heading',
            text: 'Key Achievements Include:'
        },
        {
            type: 'list',
            items: [
                'Successful deployment of nationwide network infrastructure for major telecommunications providers.',
                'Implementation of core banking systems for tier-1 financial institutions.',
                'Development of custom enterprise applications that have transformed business operations for our clients.'
            ]
        }
    ]
  },
  {
    id: "awards",
    title: "Awards",
    icon: Award,
    content: [
        {
            type: 'paragraph',
            text: 'Task Systems has been honored with multiple industry awards and recognitions that validate our expertise and commitment to excellence in ICT solutions delivery.'
        },
        {
            type: 'heading',
            text: 'Awards and Recognitions:'
        },
        {
            type: 'list',
            items: [
                'ICT Company of the Year - Nigeria Technology Awards 2023',
                'Excellence in System Integration - West Africa ICT Awards 2022',
                'Best Enterprise Solutions Provider - Lagos Business Excellence Awards 2021',
                'Innovation in Digital Transformation - Nigeria ICT Innovation Awards 2020',
                'Outstanding Partnership Award - Microsoft Nigeria 2019',
                'Cisco Partner of Excellence Award - West Africa Region 2018'
            ]
        },
        {
            type: 'paragraph',
            text: 'These awards reflect our dedication to innovation, quality service delivery, and our role as a trusted technology partner. Our recognition by industry peers and clients alike demonstrates our consistent ability to exceed expectations and deliver solutions that drive business success.'
        }
    ]
  },
  {
    id: "references",
    title: "References",
    icon: Star,
    content: [
        {
            type: 'paragraph',
            text: "Task Systems has built strong relationships with leading organizations across various industries. Our client references span multiple sectors and include some of the most respected names in Nigerian and Sub-Saharan business."
        },
        {
            type: 'heading',
            text: 'Banking & Financial Services:'
        },
        {
            type: 'paragraph',
            text: 'Our solutions have powered critical operations for major commercial banks, enabling secure transaction processing, regulatory compliance, and digital banking transformation initiatives.'
        },
        {
            type: 'heading',
            text: 'Oil & Gas Sector:'
        },
        {
            type: 'paragraph',
            text: 'We have implemented robust ICT infrastructure for upstream, midstream, and downstream operations, supporting mission-critical applications in challenging environments.'
        },
        {
            type: 'heading',
            text: 'Telecommunications:'
        },
        {
            type: 'paragraph',
            text: 'Our network solutions and managed services have enabled telecommunications providers to deliver reliable services to millions of subscribers across the region.'
        },
        {
            type: 'heading',
            text: 'Public Sector:'
        },
        {
            type: 'paragraph',
            text: 'Our e-governance solutions have enhanced service delivery for government agencies, improving citizen engagement and operational efficiency.'
        },
        {
            type: 'paragraph',
            text: 'All our client relationships are built on trust, transparency, and proven results. We maintain confidentiality agreements that protect our clients\' sensitive information while demonstrating our capability through successful project outcomes.'
        }
    ]
  },
];

const ContentRenderer = ({ content }: { content: any[] }) => {
    return (
        <div className="prose prose-lg max-w-none text-muted-foreground">
            {content.map((item, index) => {
                switch (item.type) {
                    case 'paragraph':
                        return <p key={index} className="leading-relaxed">{item.text}</p>;
                    case 'heading':
                        return <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-2">{item.text}</h3>;
                    case 'list':
                        return (
                            <ul key={index} className="space-y-2 list-none p-0">
                                {item.items.map((li: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                        <span>{li}</span>
                                    </li>
                                ))}
                            </ul>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};


export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("achievements");
  const activeContent = portfolioTabs.find((tab) => tab.id === activeTab);

  return (
    <div className="bg-background">
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
            <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our achievements, awards, and client references that
              showcase our expertise and commitment to excellence
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
                    ? "bg-primary text-black border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
            {activeContent && (
              <div className="bg-card rounded-lg p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <activeContent.icon className="h-8 w-8 text-primary" />
                  {activeContent.title}
                </h2>
                <ContentRenderer content={activeContent.content} />
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
