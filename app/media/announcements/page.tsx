import { getDb } from '@/lib/azure';
import { Megaphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MediaNav } from '@/components/media-nav';

export const revalidate = 60; // Revalidate every 60 seconds

export const metadata = {
  title: "Announcements",
  description: "Stay updated with the latest company news, product launches, and important announcements from Task Systems.",
};

async function getAnnouncements() {
  const db = await getDb();
  const result = await db.request().query`
    SELECT *
    FROM announcements
    WHERE expires_at IS NULL OR expires_at > GETDATE()
    ORDER BY created_at DESC
  `;
  return result.recordset;
}

const AnnouncementsListPage = async () => {
  const announcements = await getAnnouncements();

  return (
    <div className="bg-background text-foreground">
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement: any) => {
              const imageUrl = announcement.image_path;
              return (
                <Link href={`/media/announcements/${announcement.id}`} key={announcement.id} className="bg-card border border-border rounded-lg overflow-hidden flex flex-col shadow-md hover:shadow-lg transition-shadow group">
                  <div className="relative w-full h-48 bg-muted">
                    {imageUrl ? (
                      <Image src={imageUrl} alt={announcement.title} layout="fill" className="object-cover" unoptimized/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Megaphone className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{announcement.title}</h2>
                    {announcement.short_description && <p className="text-muted-foreground flex-grow line-clamp-3">{announcement.short_description}</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-card border border-border rounded-lg p-12 mt-16">
            <Megaphone className="h-24 w-24 text-primary/50 mb-6" />
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              No Announcements Yet
            </h2>
            <p className="text-muted-foreground max-w-md">
              Check back soon for exciting updates!
            </p>
          </div>
        )}

        <MediaNav
          prev={{ name: 'Blogs', href: '/media/blogs' }}
          next={{ name: 'Events', href: '/media/events' }}
        />
      </div>
    </div>
  );
};

export default AnnouncementsListPage;
