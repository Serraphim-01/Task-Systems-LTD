import { supabase } from '@/lib/supabase';
import { Paperclip, ExternalLink, ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

async function getEvent(id: string) {
  const { data, error } = await supabase
    .from('events')
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
        const event = await getEvent(params.id);
        return {
            title: event.title,
            description: event.short_description,
        };
    } catch (error) {
        return {
            title: 'Event Not Found',
            description: 'The requested event could not be found.',
        }
    }
}

const EventDetailPage = async ({ params }: { params: { id:string } }) => {
  const event = await getEvent(params.id);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const imageUrl = event.image_path ? `${supabaseUrl}/storage/v1/object/public/images/${event.image_path}` : null;
  const docUrl = event.document_path ? `${supabaseUrl}/storage/v1/object/public/documents/${event.document_path}` : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <Link href="/media/events" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
        </Link>
        <article className="bg-card border border-border rounded-lg p-6 md:p-8 shadow-sm">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{event.title}</h1>
            <div className="space-y-3 text-muted-foreground text-md mb-4">
                {event.date && <p className="flex items-center gap-3"><Calendar className="h-5 w-5" /><span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>}
                {event.time && <p className="flex items-center gap-3"><Clock className="h-5 w-5" /><span>{event.time}</span></p>}
                {event.location && <p className="flex items-center gap-3"><MapPin className="h-5 w-5" /><span>{event.location}</span></p>}
            </div>
            {event.short_description && <p className="text-xl text-muted-foreground mt-6">{event.short_description}</p>}
          </header>

          {imageUrl && (
            <div className="my-6">
                <Image src={imageUrl} alt={event.title} width={800} height={450} className="rounded-md object-cover" unoptimized/>
            </div>
          )}

          {event.full_text && <div className="prose prose-lg max-w-none mt-6" dangerouslySetInnerHTML={{ __html: event.full_text }} />}

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
              {event.links?.map((link: any, index: number) => (
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

export default EventDetailPage;
