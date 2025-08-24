export const revalidate = 60; // Revalidate every 60 seconds

import { HeroSection } from '@/components/home/hero-section';
import { AboutIntro } from '@/components/home/about-intro';
import { VideoAboutSection } from '@/components/home/video-about-section';
import { DirectorsSection } from '@/components/home/directors-section';
import { ManagementSection } from '@/components/home/management-section';
import { PartnersSection } from '@/components/home/partners-section';
import { NewsletterSection } from '@/components/home/newsletter-section';
import { getRoDb } from '@/lib/azure';
import { getCertificates } from '@/components/admin/content-actions';
import { CertificatesSection } from '@/components/home/certificates-section';

async function getPartners() {
  const db = await getRoDb();
  const result = await db.request().query('SELECT * FROM partners');
  return result.recordset;
}

export default async function Home() {
  const partners = await getPartners();
  let certificates = await getCertificates();

  // Ensure certificates is an array to prevent crashes, but do not duplicate.
  if (!Array.isArray(certificates)) {
    certificates = [];
  }

  return (
    <div>
      <HeroSection />
      <AboutIntro />
      <VideoAboutSection />
      <CertificatesSection certificates={certificates} />
      <DirectorsSection />
      <ManagementSection />
      <PartnersSection partners={partners} />
      <NewsletterSection />
    </div>
  );
}