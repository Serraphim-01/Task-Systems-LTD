import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

async function getPartners() {
  const { data, error } = await supabase.from('partners').select('*');

  if (error) {
    console.error('Error fetching partners:', error);
    return [];
  }

  return data;
}

export async function PartnersSection() {
  const partners = await getPartners();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner: any) => {
            if (!partner.logo_path) return null; // Don't render partner if no logo

            const logoUrl = `${supabaseUrl}/storage/v1/object/public/images/${partner.logo_path}`;

            return (
              <Link key={partner.id} href={`/partner/${partner.id}`} className="flex items-center justify-center p-4 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow h-24">
                <Image src={logoUrl} alt={partner.name} width={120} height={60} className="object-contain" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}