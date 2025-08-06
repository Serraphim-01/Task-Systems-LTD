"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Briefcase, Zap, Shield, TrendingUp, Award, Target, Eye, Handshake, Heart, BookOpen, Users, Leaf, HeartPulse, CheckCircle } from 'lucide-react';

const coreValues = [
  {
    title: "Professionalism",
    icon: Briefcase,
    description: "in our staff, in our procedures and processes and in our services."
  },
  {
    title: "Responsiveness",
    icon: Zap,
    description: "to any and all factors that can affect our clients’ business productivity."
  },
  {
    title: "Integrity",
    icon: Shield,
    description: "we honestly and ethically take responsibility in order to earn the trust of our clients."
  },
  {
    title: "Dynamism",
    icon: TrendingUp,
    description: "to deliver best value each time Excellence; to stand out from the competition."
  },
  {
    title: "Excellence",
    icon: Award,
    description: "to stand out from competition."
  }
];

const strategyItems = [
    {
      title: "Customer-Centric Approach",
      description: "Our foremost strategy is to place our customers at the heart of everything we do. We are committed to understanding their unique needs and challenges, allowing us to deliver tailored solutions that drive their success. By fostering strong partnerships, we aim to become a trusted advisor and an integral part of their growth journey.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
    },
    {
      title: "Innovation and Agility",
      description: "In a rapidly evolving technological landscape, we prioritize innovation and agility. We continuously explore emerging technologies, embrace new ideas, and adapt our strategies to stay ahead of the curve. Our agile approach enables us to respond swiftly to market changes and deliver cutting-edge solutions that provide a competitive edge.",
      image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
    },
    {
      title: "Sustainable Growth",
      description: "We are dedicated to achieving sustainable growth that benefits our clients, employees, and the wider community. Our strategy involves long-term planning, responsible business practices, and a commitment to environmental and social responsibility. By building a resilient and sustainable business, we create lasting value for all stakeholders.",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
    }
  ];

const csrItems = [
    { title: "Charity", icon: Heart, description: "We actively support charitable causes and community development initiatives, contributing to the welfare of underserved communities across Nigeria." },
    { title: "Empowerment", icon: Users, description: "Our empowerment programs focus on skills development and capacity building, creating opportunities for individuals and communities to achieve sustainable growth." },
    { title: "Education", icon: BookOpen, description: "We invest in educational initiatives, providing scholarships, technology access, and learning resources to support academic excellence and digital literacy." },
    { title: "Sponsorship", icon: Handshake, description: "Through strategic sponsorships, we support events, programs, and initiatives that promote innovation, entrepreneurship, and community development." }
];

const sustainabilityItems = [
    { title: "Commitment", icon: Leaf, description: "We are committed to conducting our business in an environmentally responsible manner, implementing sustainable practices across all our operations and encouraging eco-friendly solutions." },
    { title: "Health & Safety", icon: HeartPulse, description: "The health and safety of our employees, clients, and communities is paramount. We maintain strict safety protocols and promote a culture of well-being in all our activities." },
    { title: "Quality Standard", icon: CheckCircle, description: "Our commitment to quality extends beyond service delivery to include sustainable business practices, continuous improvement, and responsible resource management that benefits all stakeholders." }
];

export default function DiscoverUsPage() {
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
              Discover Us
            </h1>
            <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Learn about our mission, vision, and the values that drive our commitment to excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision and Core Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission & Vision */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg p-8 shadow-lg dark:shadow-[0_0_15px_rgba(255,187,0,0.1)] dark:hover:shadow-[0_0_25px_rgba(255,187,0,0.2)] transition-shadow"
              >
                <h2 className="text-2xl font-bold text-[#ffbb00] mb-4 flex items-center gap-3"><Target className="h-7 w-7" /> Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  &quot;To sustain a best-in-class technology solutions company that anticipates the future and delivers value to our customers, through a highly motivated and professional team.&quot;
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-card rounded-lg p-8 shadow-lg dark:shadow-[0_0_15px_rgba(255,187,0,0.1)] dark:hover:shadow-[0_0_25px_rgba(255,187,0,0.2)] transition-shadow"
              >
                <h2 className="text-2xl font-bold text-[#ffbb00] mb-4 flex items-center gap-3"><Eye className="h-7 w-7" /> Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  &quot;To be the leading and preferred technology solution provider in Africa, as adjudged by our customers and stakeholders, by the year 2030.&quot;
                </p>
              </motion.div>
            </div>

            {/* Core Values */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-foreground mb-6">Core Values</h2>
              </motion.div>

              <div className="space-y-6">
                {coreValues.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start gap-4 dark:shadow-[0_0_15px_rgba(255,187,0,0.1)] dark:hover:shadow-[0_0_25px_rgba(255,187,0,0.2)]"
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                        <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-[#ffbb00] mb-2">
                        {value.title}
                        </h3>
                        <p className="text-muted-foreground">
                        {value.description}
                        </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Strategy Section */}
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
                Corporate Strategy
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our strategic approach to delivering innovative solutions and driving business growth
                </p>
            </motion.div>

            <div className="space-y-16">
                {strategyItems.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className={`flex flex-col lg:flex-row items-center gap-12 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                >
                    {/* Text Content */}
                    <div className="lg:w-1/2">
                    <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>

                    {/* Image */}
                    <div className="lg:w-1/2">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                        <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        />
                    </div>
                    </div>
                </motion.div>
                ))}
            </div>
            </div>
        </section>

      {/* Corporate Social Responsibility */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Corporate Social Responsibility
              </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {csrItems.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center dark:shadow-[0_0_15px_rgba(255,187,0,0.1)] dark:hover:shadow-[0_0_25px_rgba(255,187,0,0.2)]"
                >
                    <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                        <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#ffbb00] mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Policy */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Sustainability Policy
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sustainabilityItems.map((item, index) => (
                <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center dark:shadow-[0_0_15px_rgba(255,187,0,0.1)] dark:hover:shadow-[0_0_25px_rgba(255,187,0,0.2)]"
                >
                    <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                        <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#ffbb00] mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}