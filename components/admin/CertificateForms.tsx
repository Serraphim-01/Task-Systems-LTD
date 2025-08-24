'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { addCertificate, deleteCertificate } from './content-actions';

// --- Add Certificate Form ---
const certificateSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  image: z.any().refine((files) => files?.length === 1, 'Image is required.'),
});
type CertificateFormValues = z.infer<typeof certificateSchema>;

export function AddCertificateForm() {
  const { toast } = useToast();
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: { title: '' },
  });

  const imageRef = form.register('image');

  const onCertificateSubmit = async (values: CertificateFormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('image', values.image[0]);
    const result = await addCertificate(formData);
    if (result.error) {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: result.success });
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onCertificateSubmit)} className="space-y-4 mt-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Add New Certificate</h3>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl><Input placeholder="Certificate Title" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Badge/Image</FormLabel>
                    <FormControl><Input type="file" accept="image/*" {...imageRef} /></FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Adding...' : 'Add Certificate'}
        </Button>
      </form>
    </Form>
  );
}

// --- Certificate List ---
export function CertificateList({ certificates }: { certificates: any[] }) {
    const { toast } = useToast();
    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this certificate?')) {
            const result = await deleteCertificate(id);
            if (result.error) {
                toast({ title: 'Error', description: result.error, variant: 'destructive' });
            } else {
                toast({ title: 'Success', description: result.success });
            }
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Existing Certificates</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {certificates.map((item) => (
                    <div key={item.id} className="relative group p-4 border rounded-lg flex flex-col items-center justify-center">
                        <Image src={item.image_path} alt={item.title} width={100} height={100} className="object-contain" />
                        <p className="mt-2 text-sm font-semibold text-center">{item.title}</p>
                        <Button variant="destructive" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
