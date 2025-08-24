import { getPageDescription, getAwards } from '@/components/admin/content-actions';
import { Award } from 'lucide-react';

export const revalidate = 60;

export const metadata = {
  title: "Awards",
  description: "A showcase of the awards and recognitions we have received for our commitment to quality and service.",
};

const AwardsPage = async () => {
  const pageDescription = await getPageDescription('awards_page');
  const awards = await getAwards();

  return (
    <div className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Awards & Recognitions
          </h1>
          {pageDescription && (
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              {pageDescription}
            </p>
          )}
        </div>

        {awards.length > 0 ? (
          <div className="space-y-8 max-w-4xl mx-auto">
            {awards.map((item: any) => (
              <div key={item.id} className="flex items-start gap-6 p-6 bg-card border border-border rounded-lg">
                <div className="flex-shrink-0">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-foreground mb-2">{item.title}</h2>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>No awards have been added yet. Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AwardsPage;
