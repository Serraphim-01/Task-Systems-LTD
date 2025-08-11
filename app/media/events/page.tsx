import { supabase } from '@/lib/supabase';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export const metadata = {
  title: "Events",
  description: "Join us at our upcoming events and connect with our team.",
};

async function getEvents() {
  const { data, error } = await supabase.from('events').select('*').order('date', { ascending: true });

  if (error) {
    console.error('Error fetching events:', error);
    return [];
  }

  return data;
}

const EventsPage = async () => {
  const events = await getEvents();

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
            {events.map((event: any) => (
              <div key={event.id} className="bg-card border border-border rounded-lg overflow-hidden">
                <Image src={event.image_url} alt={event.name} width={400} height={250} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-2">{event.name}</h2>
                  <p className="text-muted-foreground text-sm mb-2">{event.location}</p>
                  <p className="text-muted-foreground text-sm mb-4">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-foreground line-clamp-3">{event.description}</p>
                </div>
              </div>
            ))}
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
