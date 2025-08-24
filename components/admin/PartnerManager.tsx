import { getPartners } from '@/lib/partners'; // Using the existing public one is fine
import { PartnerEditor } from './PartnerEditor';
import { Suspense } from 'react';

async function Partners() {
    const partners = await getPartners();
    return <PartnerEditor partners={partners} />;
}

export default function PartnerManager() {
  return (
    <Suspense fallback={<div>Loading partners...</div>}>
      <Partners />
    </Suspense>
  );
}
