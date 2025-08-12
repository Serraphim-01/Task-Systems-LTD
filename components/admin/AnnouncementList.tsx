import { supabase } from '@/lib/supabase';
import { Trash2 } from 'lucide-react';
import { deleteAnnouncement } from './actions';
import { Button } from '@/components/ui/button';

async function getAnnouncements() {
    const { data, error } = await supabase
        .from('announcements')
        .select('id, title, image_path, document_path')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching announcements for admin:', error);
        return [];
    }
    return data;
}

export async function AnnouncementList() {
    const announcements = await getAnnouncements();

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Existing Announcements</h3>
            <div className="border rounded-md">
                {announcements.map((item, index) => (
                    <div key={item.id} className={`flex items-center justify-between p-4 ${index < announcements.length - 1 ? 'border-b' : ''}`}>
                        <span className="truncate pr-4">{item.title}</span>
                        <form action={deleteAnnouncement.bind(null, item.id, item.image_path ?? undefined, item.document_path ?? undefined)}>
                            <Button variant="ghost" size="icon" type="submit" aria-label="Delete announcement">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </form>
                    </div>
                ))}
                {announcements.length === 0 && <p className="p-4 text-sm text-muted-foreground">No announcements found.</p>}
            </div>
        </div>
    );
}
