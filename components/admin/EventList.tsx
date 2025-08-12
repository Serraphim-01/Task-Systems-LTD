import { supabase } from '@/lib/supabase';
import { Trash2 } from 'lucide-react';
import { deleteEvent } from './actions';
import { Button } from '@/components/ui/button';

async function getEvents() {
    const { data, error } = await supabase
        .from('events')
        .select('id, title, image_path, document_path')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching events for admin:', error);
        return [];
    }
    return data;
}

export async function EventList() {
    const events = await getEvents();

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Existing Events</h3>
            <div className="border rounded-md">
                {events.map((item, index) => (
                    <div key={item.id} className={`flex items-center justify-between p-4 ${index < events.length - 1 ? 'border-b' : ''}`}>
                        <span className="truncate pr-4">{item.title}</span>
                        <form action={deleteEvent.bind(null, item.id, item.image_path ?? undefined, item.document_path ?? undefined)}>
                            <Button variant="ghost" size="icon" type="submit" aria-label="Delete event">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </form>
                    </div>
                ))}
                {events.length === 0 && <p className="p-4 text-sm text-muted-foreground">No events found.</p>}
            </div>
        </div>
    );
}
