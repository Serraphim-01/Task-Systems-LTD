'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
import { updatePageDescription, addAchievement, deleteAchievement } from './content-actions';

// --- Page Description Form ---
const descriptionSchema = z.object({
  description: z.string().min(1, 'Description is required.'),
});
type DescriptionFormValues = z.infer<typeof descriptionSchema>;

export function PageDescriptionForm({ initialDescription }: { initialDescription: string }) {
  const { toast } = useToast();
  const form = useForm<DescriptionFormValues>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: { description: initialDescription },
  });

  const onDescriptionSubmit = async (values: DescriptionFormValues) => {
    const formData = new FormData();
    formData.append('page_key', 'achievements_page');
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
        <h3 className="text-lg font-semibold">Achievements Page Description</h3>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter the description for the achievements page" {...field} />
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

// --- Add Achievement Form ---
const achievementSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().min(1, 'Description is required.'),
});
type AchievementFormValues = z.infer<typeof achievementSchema>;

export function AddAchievementForm() {
  const { toast } = useToast();
  const form = useForm<AchievementFormValues>({
    resolver: zodResolver(achievementSchema),
    defaultValues: { title: '', description: '' },
  });

  const onAchievementSubmit = async (values: AchievementFormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    const result = await addAchievement(formData);
    if (result.error) {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: result.success });
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onAchievementSubmit)} className="space-y-4 mt-6 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Add New Achievement</h3>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl><Input placeholder="Achievement Title" {...field} /></FormControl>
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
              <FormControl><Textarea placeholder="Achievement Description" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Adding...' : 'Add Achievement'}
        </Button>
      </form>
    </Form>
  );
}

// --- Achievement List ---
export function AchievementList({ achievements }: { achievements: any[] }) {
    const { toast } = useToast();
    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this achievement?')) {
            const result = await deleteAchievement(id);
            if (result.error) {
                toast({ title: 'Error', description: result.error, variant: 'destructive' });
            } else {
                toast({ title: 'Success', description: result.success });
            }
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Existing Achievements</h3>
            <div className="space-y-4">
                {achievements.map((item) => (
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
