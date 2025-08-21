'use client';

import { useToast } from '@/hooks/use-toast';
import { deleteDirector } from './people-actions';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getDirectors } from './people-actions';

const DirectorList = () => {
  const [directors, setDirectors] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDirectors = async () => {
        const result = await getDirectors();
        setDirectors(result);
    };
    fetchDirectors();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this director?')) {
      const result = await deleteDirector(id);
      if (result?.error) {
        toast({ title: 'Error', description: result.error, variant: 'destructive' });
      } else {
        toast({ title: 'Success', description: result.success });
        setDirectors(directors.filter(d => d.id !== id));
      }
    }
  };

  return (
    <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Current Directors</h3>
      {directors.length === 0 && <p>No directors found.</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {directors.map((director) => (
          <div key={director.id} className="relative group">
            <Image
              src={director.image_path}
              alt={director.name}
              width={200}
              height={300}
              className="rounded-md object-cover"
            />
            <div className="absolute top-1 right-1">
              <Button variant="destructive" size="icon" onClick={() => handleDelete(director.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-center">
              <p className="font-semibold">{director.name}</p>
              <p className="text-sm text-muted-foreground">{director.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectorList;
