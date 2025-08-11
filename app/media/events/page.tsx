import { supabase } from '@/lib/supabase';
import { Calendar, Clock, MapPin, Paperclip, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: "Events",
  description: "Join us at our upcoming events and connect with our team.",
};

async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .or('expires_at.is.null,expires_at.gt.now()')
    .order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data;
}

const EventsPage = async () => {
  const events = await getEvents();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Events
          </h1>
          <p className="text-base md:text-lg text-muted-foreground">
            Join us at our upcoming events and connect with our team.
          </p>
        </div>

        {events.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event: any) => {
              const imageUrl = event.image_path ? `${supabaseUrl}/storage/v1/object/public/images/${event.image_path}` : null;

              return (
                <article key={event.id} className="bg-card border border-border rounded-lg overflow-hidden flex flex-col shadow-md">
                  {imageUrl && <Image src={imageUrl} alt={event.title} width={400} height={250} className="w-full h-48 object-cover" />}
                  <div className="p-6 flex flex-col flex-grow">
                    <header>
                        <h2 className="text-xl font-semibold text-foreground mb-3">{event.title}</h2>
                        {event.short_description && <p className="text-muted-foreground mb-4">{event.short_description}</p>}
                        <div className="space-y-2 text-muted-foreground text-sm">
                            {event.date && <p className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>}
                            {event.time && <p className="flex items-center gap-2"><Clock className="h-4 w-4" /><span>{event.time}</span></p>}
                            {event.location && <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{event.location}</span></p>}
                        </div>
                    </header>

                    {event.full_text && <div className="prose prose-sm max-w-none text-foreground flex-grow my-4" dangerouslySetInnerHTML={{ __html: event.full_text }} />}

                    <footer className="mt-auto pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-2">
                            {event.links?.map((link: any, index: number) => (
                                <Link key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                                    <ExternalLink className="h-4 w-4" />
                                    <span>{link.text}</span>
                                </Link>
                            ))}
                        </div>
                    </footer>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-card border border-border rounded-lg p-12">
            <Calendar className="h-24 w-24 text-primary/50 mb-6" />
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              Stay Tuned for Upcoming Events
            </h2>
            <p className="text-muted-foreground max-w-md">
              We are busy planning our next event. Check back soon for details about webinars, workshops, and conferences.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
