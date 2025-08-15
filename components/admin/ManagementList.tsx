'use client';

import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { deleteManagement } from './people-actions';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ManagementList = () => {
  const [management, setManagement] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchManagement = async () => {
      const { data, error } = await supabase.from('management').select('*').order('created_at', { ascending: false });
      if (data) setManagement(data);
    };
    fetchManagement();

    const channel = supabase.channel('management-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'management' }, (payload) => {
        fetchManagement();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleDelete = async (id: number, image_path: string) => {
    if (confirm('Are you sure you want to delete this management person?')) {
      const result = await deleteManagement(id, image_path);
      if (result?.error) {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: result.success });
      }
    }
  };

  return (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Current Management</h3>
      {management.length === 0 && <p>No management people found.</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {management.map((person) => (
          <div key={person.id} className="relative group">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${person.image_path}`}
              alt={person.name}
              width={200}
              height={300}
              className="rounded-md object-cover"
            />
            <div className="absolute top-1 right-1">
              <Button variant="destructive" size="icon" onClick={() => handleDelete(person.id, person.image_path)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-center">
              <p className="font-semibold">{person.name}</p>
              <p className="text-sm text-muted-foreground">{person.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagementList;
