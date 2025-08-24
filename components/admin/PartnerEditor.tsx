'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit } from 'lucide-react';
import { addPartner, updatePartner, deletePartner } from './actions';
import Image from 'next/image';

// --- Zod Schema ---
const formSchema = z.object({
  name: z.string().min(1, 'Partner name is required.'),
  status: z.string().min(1, 'Status is required.'),
  link: z.string().url('A valid URL is required.'),
  services: z.string().optional(),
  logo: z.any().optional(),
});
type PartnerFormValues = z.infer<typeof formSchema>;

// --- Partner Form (for Add/Edit) ---
function PartnerForm({ partner, onFinished }: { partner?: any; onFinished: () => void }) {
  const { toast } = useToast();
  const isEditMode = !!partner;

  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: partner ? {
        ...partner,
        services: partner.services ? JSON.parse(partner.services).join(', ') : '',
    } : {
      name: '',
      status: '',
      link: '',
      services: '',
    },
  });

  const logoRef = form.register('logo');

  const onSubmit = async (values: PartnerFormValues) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('status', values.status);
    formData.append('link', values.link);
    formData.append('services', values.services || '');
    if (values.logo?.[0]) {
      formData.append('logo', values.logo[0]);
    }

    const result = isEditMode
      ? await updatePartner(partner.id, formData)
      : await addPartner(formData);

    if (result?.error) {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: result.success });
      onFinished();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold mb-6">{isEditMode ? 'Edit Partner' : 'Add New Partner'}</h2>
        <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Partner Name</FormLabel><FormControl><Input placeholder="Partner Name" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="status" render={({ field }) => (<FormItem><FormLabel>Status</FormLabel><FormControl><Input placeholder="e.g., Gold Partner" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="link" render={({ field }) => (<FormItem><FormLabel>Website URL</FormLabel><FormControl><Input placeholder="https://partner.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="services" render={({ field }) => (<FormItem><FormLabel>Services (comma-separated)</FormLabel><FormControl><Input placeholder="Service A, Service B" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="logo" render={() => (<FormItem><FormLabel>Logo {isEditMode && '(leave blank to keep existing)'}</FormLabel><FormControl><Input type="file" accept="image/*" {...logoRef} /></FormControl><FormMessage /></FormItem>)} />
        <Button type="submit" disabled={form.formState.isSubmitting}>{isEditMode ? 'Update' : 'Add'} Partner</Button>
        {isEditMode && <Button type="button" variant="outline" onClick={onFinished}>Cancel</Button>}
      </form>
    </Form>
  );
}

// --- Partner List ---
function PartnerList({ partners, onEdit }: { partners: any[], onEdit: (partner: any) => void }) {
    const { toast } = useToast();
    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this partner?')) {
            const result = await deletePartner(id);
            if (result.error) toast({ title: 'Error', description: result.error, variant: 'destructive' });
            else toast({ title: 'Success', description: result.success });
        }
    };
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Existing Partners</h2>
            <div className="space-y-4">
                {partners.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                            <Image src={item.logo_path} alt={item.name} width={40} height={40} className="object-contain rounded-md bg-white p-1" />
                            <p className="font-bold">{item.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => onEdit(item)}><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Main Editor Component ---
export function PartnerEditor({ partners }: { partners: any[] }) {
    const [editingPartner, setEditingPartner] = useState<any | null>(null);

    const handleEdit = (partner: any) => {
        setEditingPartner(partner);
    };

    const handleFinished = () => {
        setEditingPartner(null);
    };

    return (
        <div className="grid md:grid-cols-2 gap-12">
            <div>
                {editingPartner ? (
                    <PartnerForm partner={editingPartner} onFinished={handleFinished} />
                ) : (
                    <PartnerForm onFinished={handleFinished} />
                )}
            </div>
            <div>
                <PartnerList partners={partners} onEdit={handleEdit} />
            </div>
        </div>
    );
}
