export const revalidate = 60; // Revalidate every 60 seconds

import { HeroSection } from '@/components/home/hero-section';
import { AboutIntro } from '@/components/home/about-intro';
import { VideoAboutSection } from '@/components/home/video-about-section';
import { SolutionsSlideshow } from '@/components/home/solutions-slideshow';
// import { SolutionsGrid } from '@/components/home/solutions-grid';
import { DirectorsSection } from '@/components/home/directors-section';
import { ManagementSection } from '@/components/home/management-section';
import { PartnersSection } from '@/components/home/partners-section';
import { NewsletterSection } from '@/components/home/newsletter-section';
import { getRoDb } from '@/lib/azure';

async function getPartners() {
  const db = await getRoDb();
  const result = await db.request().query('SELECT * FROM partners');
  return result.recordset;
}

export default async function Home() {
  const partners = await getPartners();

  return (
    <div>
      <HeroSection />
      <AboutIntro />
      <VideoAboutSection />
      <SolutionsSlideshow />
      {/* <SolutionsGrid /> */}
      <DirectorsSection />
      <ManagementSection />
      <PartnersSection partners={partners} />
      <NewsletterSection />
    </div>
  );
}