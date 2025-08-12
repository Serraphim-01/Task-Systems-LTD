import { supabase } from '@/lib/supabase';
import { Wind } from 'lucide-react';
import React from 'react';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "Careers",
  description: "Join our team of innovators and help shape the future of technology in Africa.",
};

async function getJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .or('expires_at.is.null,expires_at.gt.now()')
    .order('title', { ascending: true });

  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }

  return data;
}

const CareersPage = async () => {
  const jobs = await getJobs();

  return (
    <div className="bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Job Openings
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Join our team of innovators and help shape the future of technology in Africa.
          </p>
        </div>

        {jobs.length > 0 ? (
          <div className="space-y-8">
            {jobs.map((job: any) => (
              <div key={job.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-2">{job.title}</h2>
                    <p className="text-muted-foreground text-sm mb-1">{job.department}</p>
                    <p className="text-muted-foreground text-sm mb-4">{job.location} • {job.type}</p>
                  </div>
                  <a href={job.apply_link || '#'} target="_blank" rel="noopener noreferrer" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium self-start">
                    Apply Now
                  </a>
                </div>
                <div className="prose prose-sm max-w-none text-foreground mt-4" dangerouslySetInnerHTML={{ __html: job.description }}>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-card border border-border rounded-lg p-12">
            <Wind className="h-24 w-24 text-primary/50 mb-6" />
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Nothing to see here... yet!
            </h2>
            <p className="text-muted-foreground max-w-md">
              There are currently no open positions. Please check back later, or follow us on our social channels for updates on new opportunities.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareersPage;
