import { supabase } from '@/lib/supabase';
import { Paperclip, ExternalLink, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

export const revalidate = 60; // Revalidate every 60 seconds

async function getAnnouncement(id: string) {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }
  return data;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    try {
        const announcement = await getAnnouncement(params.id);
        return {
            title: announcement.title,
            description: announcement.short_description,
        };
    } catch (error) {
        return {
            title: 'Announcement Not Found',
            description: 'The requested announcement could not be found.',
        }
    }
}

const AnnouncementDetailPage = async ({ params }: { params: { id: string } }) => {
  const announcement = await getAnnouncement(params.id);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const imageUrl = announcement.image_path ? `${supabaseUrl}/storage/v1/object/public/images/${announcement.image_path}` : null;
  const docUrl = announcement.document_path ? `${supabaseUrl}/storage/v1/object/public/documents/${announcement.document_path}` : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link href="/media/announcements" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            Back to Announcements
        </Link>
        <article className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
          <header>
            <p className="text-sm text-muted-foreground mb-2">
              {new Date(announcement.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{announcement.title}</h1>
            {announcement.short_description && <p className="text-xl text-muted-foreground mb-4">{announcement.short_description}</p>}
          </header>

          {imageUrl && (
            <div className="my-6">
                <Image src={imageUrl} alt={announcement.title} width={800} height={450} className="rounded-md object-cover" unoptimized/>
            </div>
          )}

          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: announcement.full_text }} />

          <footer className="mt-6 pt-6 border-t border-border">
            {docUrl && (
              <a href={docUrl} target="_blank" rel="noopener noreferrer" className="block mb-4 text-primary hover:underline font-semibold">
                <div className="inline-flex items-center gap-2">
                    <Paperclip className="h-5 w-5" />
                    Download Attached Document
                </div>
              </a>
            )}

            <div className="flex flex-wrap gap-3">
              {announcement.links?.map((link: any, index: number) => (
                <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                  <span>{link.text}</span>
                </Link>
              ))}
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default AnnouncementDetailPage;
