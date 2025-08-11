import { supabase } from '@/lib/supabase';
import { Megaphone } from 'lucide-react';
import React from 'react';

export const metadata = {
  title: "Announcements",
  description:
    "Stay updated with the latest company news, product launches, and important announcements from Task Systems.",
};

async function getAnnouncements() {
  const { data, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }

  return data;
}

const AnnouncementsPage = async () => {
  const announcements = await getAnnouncements();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Announcements & Press Releases
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Stay updated with the latest news and official statements from Task Systems.
          </p>
        </div>

        {announcements.length > 0 ? (
          <div className="space-y-8">
            {announcements.map((announcement: any) => (
              <div key={announcement.id} className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">{announcement.title}</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {new Date(announcement.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-foreground">{announcement.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-card border border-border rounded-lg p-12">
            <Megaphone className="h-24 w-24 text-primary/50 mb-6" />
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              No Announcements Yet
            </h2>
            <p className="text-muted-foreground max-w-md">
              There are currently no announcements. Check back soon for exciting updates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
