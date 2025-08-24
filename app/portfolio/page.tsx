import PortfolioPageClient from "@/app/portfolio/client-portfolio";
import { getAchievements, getAwards, getCertificates, getPageDescription } from '@/components/admin/content-actions';

export const metadata = {
  title: "Our Portfolio",
  description:
    "Explore Task Systems' achievements, awards, and certificates, showcasing our expertise and commitment to excellence.",
};

export default async function Page() {
  const achievements = await getAchievements();
  const awards = await getAwards();
  const certificates = await getCertificates();
  const achievementsDescription = await getPageDescription('achievements_page');
  const awardsDescription = await getPageDescription('awards_page');

  const portfolioData = {
    achievements: {
      description: achievementsDescription,
      items: achievements,
    },
    awards: {
      description: awardsDescription,
      items: awards,
    },
    certificates: {
      items: certificates,
    },
  };

  return <PortfolioPageClient data={portfolioData} />;
}
