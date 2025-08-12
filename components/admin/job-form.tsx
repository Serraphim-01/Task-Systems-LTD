'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { addJob } from './actions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Job title is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  location: z.string().min(1, { message: 'Location is required.' }),
  type: z.string().min(1, { message: 'Job type is required.' }),
  department: z.string().min(1, { message: 'Department is required.' }),
  apply_link: z.string().url({ message: 'Please enter a valid URL.' }),
  expires_at: z.string().optional(),
});

type JobFormValues = z.infer<typeof formSchema>;

const JobForm = () => {
  const { toast } = useToast();
  const form = useForm<JobFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      type: '',
      department: '',
      apply_link: '',
      expires_at: '',
    },
  });

  const onSubmit = async (values: JobFormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    if (values.expires_at) {
        formData.set('expires_at', new Date(values.expires_at).toISOString());
    }

    const result = await addJob(formData);

    if (result?.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: result.success,
      });
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="e.g., Software Engineer" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="department" render={({ field }) => (
                <FormItem><FormLabel>Department</FormLabel><FormControl><Input placeholder="e.g., Engineering" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="e.g., Lagos, Nigeria" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="type" render={({ field }) => (
                <FormItem><FormLabel>Job Type</FormLabel><FormControl><Input placeholder="e.g., Full-time" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
        </div>
        <FormField control={form.control} name="apply_link" render={({ field }) => (
            <FormItem><FormLabel>Application Link</FormLabel><FormControl><Input placeholder="https://example.com/apply" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="expires_at" render={({ field }) => (
            <FormItem><FormLabel>Expiration Date (Optional)</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Detailed job description..." rows={8} {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Adding Job...' : 'Add Job'}
        </Button>
      </form>
    </Form>
  );
};

export default JobForm;
