'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, XCircle } from 'lucide-react';
import Image from 'next/image';
import { addCertificate, updateCertificate, deleteCertificate } from './content-actions';

// --- Certificate Form (for Add/Edit) ---
const certificateSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  image: z.any().optional(), // Image is optional for update
});
type CertificateFormValues = z.infer<typeof certificateSchema>;

function CertificateForm({ certificate, onFinished }: { certificate?: any; onFinished: () => void }) {
  const { toast } = useToast();
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: certificate || { title: '' },
  });

  const imageRef = form.register('image');
  const isEditMode = !!certificate;

  const onSubmit = async (values: CertificateFormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    if (values.image?.[0]) {
      formData.append('image', values.image[0]);
    }

    let result;
    if (isEditMode) {
      formData.append('id', certificate.id);
      result = await updateCertificate(formData);
    } else {
        if (!values.image?.[0]) {
            form.setError('image', { type: 'manual', message: 'Image is required.' });
            return;
        }
        result = await addCertificate(formData);
    }

    if (result.error) {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: result.success });
      form.reset();
      onFinished();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6 p-4 border rounded-lg relative">
        <h3 className="text-lg font-semibold">{isEditMode ? 'Edit Certificate' : 'Add New Certificate'}</h3>
        {isEditMode && (
            <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={onFinished}>
                <XCircle className="h-5 w-5" />
            </Button>
        )}
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
                    <FormLabel>Badge/Image {isEditMode && '(leave blank to keep existing)'}</FormLabel>
                    <FormControl><Input type="file" accept="image/*" {...imageRef} /></FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Certificate' : 'Add Certificate')}
        </Button>
      </form>
    </Form>
  );
}

// --- Certificate List ---
function CertificateList({ certificates, onEdit }: { certificates: any[]; onEdit: (certificate: any) => void }) {
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
                        <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => onEdit(item)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="icon" className="h-7 w-7" onClick={() => handleDelete(item.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


// --- Main Editor Component ---
export function CertificateEditor({ certificates }: { certificates: any[] }) {
    const [editingCertificate, setEditingCertificate] = useState<any | null>(null);

    const handleEdit = (certificate: any) => {
        setEditingCertificate(certificate);
    };

    const handleFinished = () => {
        setEditingCertificate(null);
    };

    return (
        <div>
            <CertificateForm certificate={editingCertificate} onFinished={handleFinished} />
            <CertificateList certificates={certificates} onEdit={handleEdit} />
        </div>
    )
}
