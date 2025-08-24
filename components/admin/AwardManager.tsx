import { getPageDescription, updatePageDescription, getAwards, addAward, deleteAward } from './content-actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
import { revalidatePath } from 'next/cache';

// Use a client component for the form parts to use hooks
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

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

// --- Add Award Form ---
const awardSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
});
type AwardFormValues = z.infer<typeof awardSchema>;

function AddAwardForm() {
  const { toast } = useToast();
  const form = useForm<AwardFormValues>({
    resolver: zodResolver(awardSchema),
    defaultValues: { title: '', description: '' },
  });

  const onAwardSubmit = async (values: AwardFormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    const result = await addAward(formData);
    if (result.error) {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: result.success });
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onAwardSubmit)} className="space-y-4 mt-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Add New Award</h3>
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
          {form.formState.isSubmitting ? 'Adding...' : 'Add Award'}
        </Button>
      </form>
    </Form>
  );
}

// --- Award List ---
function AwardList({ awards }: { awards: any[] }) {
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
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}


// --- Main Manager Component ---
export default async function AwardManager() {
  const initialDescription = await getPageDescription('awards_page');
  const awards = await getAwards();

  return (
    <div>
      <PageDescriptionForm initialDescription={initialDescription} />
      <AddAwardForm />
      <AwardList awards={awards} />
    </div>
  );
}
