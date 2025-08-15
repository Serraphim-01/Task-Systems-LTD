'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { addManagement } from './people-actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  position: z.string().min(1, { message: 'Position is required.' }),
  image: z.any().refine((files) => files?.length === 1, 'Image is required.'),
});

type ManagementFormValues = z.infer<typeof formSchema>;

const ManagementForm = () => {
  const { toast } = useToast();
  const form = useForm<ManagementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      position: '',
    },
  });

  const imageRef = form.register('image');

  const onSubmit = async (values: ManagementFormValues) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('position', values.position);
    formData.append('image', values.image[0]);

    const result = await addManagement(formData);

    if (result?.error) {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: result.success });
      form.reset();
    }
  };

  return (
    <Form {...form}>
        <h3 className="text-lg font-semibold mb-4">Add New Management Person</h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl><Input placeholder="Management Person's Name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="position" render={({ field }) => (
          <FormItem>
            <FormLabel>Position</FormLabel>
            <FormControl><Input placeholder="Management Person's Position" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="image" render={({ field }) => (
            <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl><Input type="file" accept="image/*" {...imageRef} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />

        <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Adding..." : "Add Management Person"}
        </Button>
      </form>
    </Form>
  );
};

export default ManagementForm;
