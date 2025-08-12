import { supabase } from '@/lib/supabase';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const revalidate = 60;

export const metadata = {
  title: "Our Partners",
  description: "A comprehensive list of all our valued partners.",
};

async function getAllPartners() {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching all partners:', error);
    return [];
  }
  return data;
}

const AllPartnersPage = async () => {
  const partners = await getAllPartners();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  return (
    <div className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-12 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
        </Link>
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Valued Partners</h1>
            <p className="text-lg text-muted-foreground">We are proud to collaborate with industry leaders to deliver exceptional value.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 items-center">
            {partners.map((partner: any) => {
                if (!partner.logo_path) return null;
                const logoUrl = `${supabaseUrl}/storage/v1/object/public/images/${partner.logo_path}`;
                return (
                    <Link
                        key={partner.id}
                        href={`/partner/${encodeURIComponent(partner.name)}`}
                        className="flex flex-col items-center justify-center gap-4 text-center group"
                        title={`View details for ${partner.name}`}
                    >
                        <div className="w-28 h-28 rounded-full bg-card p-3 shadow-md flex items-center justify-center transition-transform group-hover:scale-110 border">
                            <Image src={logoUrl} alt={partner.name} width={90} height={90} className="object-contain" unoptimized />
                        </div>
                        <p className="font-semibold text-sm group-hover:text-primary transition-colors">{partner.name}</p>
                    </Link>
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default AllPartnersPage;
