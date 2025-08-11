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
});

const JobForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      type: '',
      department: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('location', values.location);
    formData.append('type', values.type);
    formData.append('department', values.department);

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
        description: 'Job added successfully.',
      });
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter job title" {...field} />
              </FormControl>
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
              <FormControl>
                <Textarea placeholder="Enter job description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter job location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Full-time, Part-time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input placeholder="Enter department" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Job</Button>
      </form>
    </Form>
  );
};

export default JobForm;
