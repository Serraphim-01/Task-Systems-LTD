import { supabase } from '@/lib/supabase';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const revalidate = 60; // Revalidate every 60 seconds

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

const EventsListPage = async () => {
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
                <Link href={`/media/events/${event.id}`} key={event.id} className="bg-card border border-border rounded-lg overflow-hidden flex flex-col shadow-md hover:shadow-lg transition-shadow group">
                  <div className="relative w-full h-48 bg-muted">
                    {imageUrl ? (
                      <Image src={imageUrl} alt={event.title} layout="fill" className="object-cover" unoptimized/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">{event.title}</h2>
                    <div className="space-y-2 text-muted-foreground text-sm flex-grow">
                        {event.date && <p className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span></p>}
                        {event.time && <p className="flex items-center gap-2"><Clock className="h-4 w-4" /><span>{event.time}</span></p>}
                        {event.location && <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{event.location}</span></p>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-card border border-border rounded-lg p-12 mt-16">
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

export default EventsListPage;
