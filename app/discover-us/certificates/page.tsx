import { getCertificates } from '@/components/admin/content-actions';
import Image from 'next/image';

export const revalidate = 60;

export const metadata = {
  title: "Certificates",
  description: "Our certifications from leading global technology partners, demonstrating our expertise and compliance with industry standards.",
};

const CertificatesPage = async () => {
  const certificates = await getCertificates();

  return (
    <div className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Certificates
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            We hold numerous certifications from our global technology partners, a testament to our skills and adherence to the highest industry standards.
          </p>
        </div>

        {certificates.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
            {certificates.map((item: any) => (
              <div key={item.id} className="flex flex-col items-center justify-center gap-4 text-center group">
                <div className="w-40 h-40 rounded-lg bg-card p-4 shadow-md flex items-center justify-center transition-transform group-hover:scale-105 border">
                    <Image src={item.image_path} alt={item.title} width={150} height={150} className="object-contain" unoptimized />
                </div>
                <h2 className="font-semibold text-md group-hover:text-primary transition-colors">{item.title}</h2>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>No certificates have been added yet. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesPage;
