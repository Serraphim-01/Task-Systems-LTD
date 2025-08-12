export const revalidate = 60; // Revalidate every 60 seconds

import { HeroSection } from '@/components/home/hero-section';
import { AboutIntro } from '@/components/home/about-intro';
import { VideoAboutSection } from '@/components/home/video-about-section';
import { SolutionsSlideshow } from '@/components/home/solutions-slideshow';
import { SolutionsGrid } from '@/components/home/solutions-grid';
import { DirectorsSection } from '@/components/home/directors-section';
import { ManagementSection } from '@/components/home/management-section';
import { PartnersSection } from '@/components/home/partners-section';
import { NewsletterSection } from '@/components/home/newsletter-section';
import { supabase } from '@/lib/supabase';

async function getPartners() {
  const { data, error } = await supabase.from('partners').select('*');
  if (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
  return data;
}

export default async function Home() {
  const partners = await getPartners();

  return (
    <div>
      <HeroSection />
      <AboutIntro />
      <VideoAboutSection />
      <SolutionsSlideshow />
      <SolutionsGrid />
      <DirectorsSection />
      <ManagementSection />
      <PartnersSection partners={partners} />
      <NewsletterSection />
    </div>
  );
}