import { supabase } from '@/lib/supabase';
import { Megaphone, Paperclip, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: "Announcements",
  description:
    "Stay updated with the latest company news, product launches, and important announcements from Task Systems.",
};

async function getAnnouncements() {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .or('expires_at.is.null,expires_at.gt.now()') // Fetch if expires_at is null or in the future
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching announcements:', error);
    return [];
  }

  return data;
}

const AnnouncementsPage = async () => {
  const announcements = await getAnnouncements();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Announcements & Press Releases
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Stay updated with the latest news and official statements from Task Systems.
          p>
        </div>

        {announcements.length > 0 ? (
          <div className="space-y-12">
            {announcements.map((announcement: any) => {
              const imageUrl = announcement.image_path ? `${supabaseUrl}/storage/v1/object/public/images/${announcement.image_path}` : null;
              const docUrl = announcement.document_path ? `${supabaseUrl}/storage/v1/object/public/documents/${announcement.document_path}` : null;

              return (
                <article key={announcement.id} className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
                  <header>
                    <p className="text-sm text-muted-foreground mb-2">
                      {new Date(announcement.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{announcement.title}</h2>
                    {announcement.short_description && <p className="text-lg text-muted-foreground mb-4">{announcement.short_description}</p>}
                  </header>

                  {imageUrl && (
                    <div className="my-6">
                        <Image src={imageUrl} alt={announcement.title} width={800} height={450} className="rounded-md object-cover" />
                    </div>
                  )}

                  <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: announcement.full_text }} />

                  <footer className="mt-6 pt-6 border-t border-border">
                    {docUrl && (
                      <a href={docUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-primary hover:underline font-semibold">
                        <Paperclip className="h-5 w-5" />
                        Download Attached Document
                      </a>
                    )}

                    <div className="flex flex-wrap gap-3 mt-4">
                      {announcement.links?.map((link: any, index: number) => (
                        <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                          <ExternalLink className="h-4 w-4" />
                          <span>{link.text}</span>
                        </Link>
                      ))}
                    </div>
                  </footer>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-card border border-border rounded-lg p-12 mt-16">
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
