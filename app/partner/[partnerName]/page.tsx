import { getDb } from '@/lib/azure';
import { ArrowLeft, CheckCircle, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

async function getPartner(name: string) {
  const partnerName = decodeURIComponent(name);
  const db = await getDb();
  const result = await db.request().input('name', partnerName).query('SELECT * FROM partners WHERE name = @name');
  const partner = result.recordset[0];

  if (!partner) {
    notFound();
  }
  return partner;
}

export async function generateMetadata({ params }: { params: { partnerName: string } }) {
    try {
        const partner = await getPartner(params.partnerName);
        return {
            title: `${partner.name} - Our Partner`,
            description: `Learn more about our partnership with ${partner.name}.`,
        };
    } catch (error) {
        return {
            title: 'Partner Not Found',
        }
    }
}

const PartnerDetailPage = async ({ params }: { params: { partnerName: string } }) => {
  const partner = await getPartner(params.partnerName);
  const logoUrl = partner.logo_path;

  return (
    <div className="bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
        </Link>
        <div className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
            <header className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                {logoUrl && (
                    <div className="flex-shrink-0 w-32 h-32 bg-white rounded-lg flex items-center justify-center p-2 shadow-md">
                        <Image src={logoUrl} alt={`${partner.name} logo`} width={120} height={120} className="object-contain" unoptimized/>
                    </div>
                )}
                <div className="flex-grow">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">{partner.name}</h1>
                    <p className="text-lg text-muted-foreground mt-1">{partner.status}</p>
                </div>
                {partner.link && (
                    <Link href={partner.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors self-start md:self-center">
                        Visit Website
                        <ExternalLink className="h-4 w-4" />
                    </Link>
                )}
            </header>

            {partner.services && partner.services.length > 0 && (
                <section>
                    <h2 className="text-2xl font-semibold border-b pb-2 mb-4">Provided Services</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                        {partner.services.map((service: string, index: number) => (
                            <li key={index} className="flex items-center gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span>{service}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
      </div>
    </div>
  );
};

export default PartnerDetailPage;
