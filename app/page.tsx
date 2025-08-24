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

  // As per user request, duplicate certificates if there are 1-3 to create a looping slideshow effect.
  if (certificates.length > 0 && certificates.length <= 3) {
    const originalCerts = [...certificates];
    // Duplicate until we have enough for two slides
    while (certificates.length < 6) {
      certificates = certificates.concat(originalCerts);
    }
    // Ensure the array is exactly 6 items long for consistency
    certificates = certificates.slice(0, 6);
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