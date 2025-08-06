"use client";

import { HeroSection } from '@/components/home/hero-section';
import { AboutIntro } from '@/components/home/about-intro';
import { VideoAboutSection } from '@/components/home/video-about-section';
import { CorporateStrategy } from '@/components/home/corporate-strategy';
import { SolutionsGrid } from '@/components/home/solutions-grid';
import { DirectorsSection } from '@/components/home/directors-section';
import { ManagementSection } from '@/components/home/management-section';
import { PartnersSection } from '@/components/home/partners-section';
import { NewsletterSection } from '@/components/home/newsletter-section';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutIntro />
      <VideoAboutSection />
      <CorporateStrategy />
      <SolutionsGrid />
      <DirectorsSection />
      <ManagementSection />
      <PartnersSection />
      <NewsletterSection />
    </div>
  );
}