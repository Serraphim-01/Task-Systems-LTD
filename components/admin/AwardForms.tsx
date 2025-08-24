'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Edit, XCircle } from 'lucide-react';
import { updatePageDescription, addAward, updateAward, deleteAward } from './content-actions';

// --- Page Description Form ---
const descriptionSchema = z.object({
  description: z.string().min(1, 'Description is required.'),
});
type DescriptionFormValues = z.infer<typeof descriptionSchema>;

function PageDescriptionForm({ initialDescription }: { initialDescription: string }) {
  const { toast } = useToast();
  const form = useForm<DescriptionFormValues>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: { description: initialDescription },
  });

  const onDescriptionSubmit = async (values: DescriptionFormValues) => {
    const formData = new FormData();
    formData.append('page_key', 'awards_page');
    formData.append('description', values.description);
    const result = await updatePageDescription(formData);
    if (result.error) {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: result.success });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onDescriptionSubmit)} className="space-y-4 mt-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Awards Page Description</h3>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter the description for the awards page" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Description'}
        </Button>
      </form>
    </Form>
  );
}

// --- Award Form (for Add/Edit) ---
const awardSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
});
type AwardFormValues = z.infer<typeof awardSchema>;

function AwardForm({ award, onFinished }: { award?: any; onFinished: () => void }) {
  const { toast } = useToast();
  const form = useForm<AwardFormValues>({
    resolver: zodResolver(awardSchema),
    defaultValues: award || { title: '', description: '' },
  });

  const isEditMode = !!award;

  const onSubmit = async (values: AwardFormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);

    let result;
    if (isEditMode) {
      formData.append('id', award.id);
      result = await updateAward(formData);
    } else {
      result = await addAward(formData);
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
        <h3 className="text-lg font-semibold">{isEditMode ? 'Edit Award' : 'Add New Award'}</h3>
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
              <FormControl><Input placeholder="Award Title" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Award Description" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Award' : 'Add Award')}
        </Button>
      </form>
    </Form>
  );
}

// --- Award List ---
function AwardList({ awards, onEdit }: { awards: any[]; onEdit: (award: any) => void }) {
    const { toast } = useToast();
    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this award?')) {
            const result = await deleteAward(id);
            if (result.error) {
                toast({ title: 'Error', description: result.error, variant: 'destructive' });
            } else {
                toast({ title: 'Success', description: result.success });
            }
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Existing Awards</h3>
            <div className="space-y-4">
                {awards.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <p className="font-bold">{item.title}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
                                <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Main Editor Component ---
export function AwardEditor({ initialDescription, awards }: { initialDescription: string; awards: any[] }) {
    const [editingAward, setEditingAward] = useState<any | null>(null);

    const handleEdit = (award: any) => {
        setEditingAward(award);
    };

    const handleFinished = () => {
        setEditingAward(null);
    };

    return (
        <div>
            <PageDescriptionForm initialDescription={initialDescription} />
            <AwardForm award={editingAward} onFinished={handleFinished} />
            <AwardList awards={awards} onEdit={handleEdit} />
        </div>
    )
}
