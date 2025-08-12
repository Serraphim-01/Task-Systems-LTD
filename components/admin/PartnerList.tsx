import { supabase } from '@/lib/supabase';
import { Trash2 } from 'lucide-react';
import { deletePartner } from './actions';
import { Button } from '@/components/ui/button';

async function getPartners() {
    const { data, error } = await supabase
        .from('partners')
        .select('id, name, logo_path')
        .order('name', { ascending: true });

    if (error) {
        console.error('Error fetching partners for admin:', error);
        return [];
    }
    return data;
}

export async function PartnerList() {
    const partners = await getPartners();

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold">Existing Partners</h3>
            <div className="border rounded-md">
                {partners.map((item, index) => (
                    <div key={item.id} className={`flex items-center justify-between p-4 ${index < partners.length - 1 ? 'border-b' : ''}`}>
                        <span className="truncate pr-4">{item.name}</span>
                        <form action={deletePartner.bind(null, item.id, item.logo_path ?? undefined)}>
                            <Button variant="ghost" size="icon" type="submit" aria-label="Delete partner">
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </form>
                    </div>
                ))}
                {partners.length === 0 && <p className="p-4 text-sm text-muted-foreground">No partners found.</p>}
            </div>
        </div>
    );
}
