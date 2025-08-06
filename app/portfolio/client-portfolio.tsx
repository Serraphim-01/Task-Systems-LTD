"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Star } from "lucide-react";

const portfolioTabs = [
  {
    id: "achievements",
    title: "Achievements",
    icon: Trophy,
    content: `Over three decades of excellence in the ICT industry, Task Systems has achieved numerous milestones...`,
  },
  {
    id: "awards",
    title: "Awards",
    icon: Award,
    content: `Task Systems has been honored with multiple industry awards and recognitions...`,
  },
  {
    id: "references",
    title: "References",
    icon: Star,
    content: `Task Systems has built strong relationships with leading organizations...`,
  },
];

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("achievements");
  const activeContent = portfolioTabs.find((tab) => tab.id === activeTab);

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
                    ? "bg-[#ffbb00] text-black border-b-2 border-[#ffbb00]"
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
                <div className="prose prose-lg max-w-none">
                  {activeContent.content
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-muted-foreground leading-relaxed mb-4"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
