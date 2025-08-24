"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Award, Star, CheckCircle } from "lucide-react";
import Image from "next/image";

const AchievementsContent = ({ description, items }: { description: string, items: any[] }) => {
    return (
        <div className="prose prose-lg max-w-none text-muted-foreground">
            {description && <p className="leading-relaxed">{description}</p>}
            <div className="space-y-8 mt-8">
                {items.map((item: any) => (
                    <div key={item.id} className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                            <Trophy className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AwardsContent = ({ description, items }: { description: string, items: any[] }) => {
    return (
        <div className="prose prose-lg max-w-none text-muted-foreground">
            {description && <p className="leading-relaxed">{description}</p>}
            <div className="space-y-8 mt-8">
                {items.map((item: any) => (
                    <div key={item.id} className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                            <Award className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CertificatesContent = ({ items }: { items: any[] }) => {
    return (
        <div>
             <p className="text-base md:text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                We hold numerous certifications from our global technology partners, a testament to our skills and adherence to the highest industry standards.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
                {items.map((item: any) => (
                <div key={item.id} className="flex flex-col items-center justify-center gap-4 text-center group">
                    <div className="w-40 h-40 rounded-lg bg-card p-4 shadow-md flex items-center justify-center transition-transform group-hover:scale-105 border">
                        <Image src={item.image_path} alt={item.title} width={150} height={150} className="object-contain" unoptimized />
                    </div>
                    <h2 className="font-semibold text-md group-hover:text-primary transition-colors">{item.title}</h2>
                </div>
                ))}
            </div>
        </div>
    );
};


export default function PortfolioPageClient({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState("achievements");

  const portfolioTabs = [
    {
      id: "achievements",
      title: "Achievements",
      icon: Trophy,
      content: <AchievementsContent description={data.achievements.description} items={data.achievements.items} />
    },
    {
      id: "awards",
      title: "Awards",
      icon: Award,
      content: <AwardsContent description={data.awards.description} items={data.awards.items} />
    },
    {
      id: "certificates",
      title: "Certificates",
      icon: Star,
      content: <CertificatesContent items={data.certificates.items} />
    },
  ];

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
              Discover our achievements, awards, and certificates that
              showcase our expertise and commitment to excellence.
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
                {activeContent.content}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
