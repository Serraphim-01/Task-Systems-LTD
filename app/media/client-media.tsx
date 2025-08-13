"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Megaphone, Calendar, Rss } from 'lucide-react';

const mediaCategories = [
  {
    name: 'Announcements & Press Releases',
    href: '/media/announcements',
    description: 'Stay updated with the latest news and official statements from Task Systems.',
    icon: Megaphone
  },
  {
    name: 'Events',
    href: '/media/events',
    description: 'Join us at our upcoming events and connect with our team.',
    icon: Calendar
  },
  {
    name: 'Blogs & Articles',
    href: '/media/blogs',
    description: 'Explore insights, trends, and stories from the world of technology.',
    icon: Rss
  }
];

export default function MediaPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Media Hub
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Explore our latest announcements, events, and articles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {mediaCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
            >
              <Link href={category.href}>
                <div className="bg-card border border-border rounded-lg p-8 h-full flex flex-col items-center text-center hover:shadow-lg hover:border-primary transition-all duration-300">
                  <div className="bg-primary/10 p-4 rounded-full mb-6">
                    <category.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">{category.name}</h2>
                  <p className="text-muted-foreground flex-grow">{category.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
