'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { addPartner } from './actions';
import { useToast } from '@/hooks/use-toast';

// Zod schema for validation
const formSchema = z.object({
  name: z.string().min(1, { message: 'Partner name is required.' }),
  logo: z.any().optional(), // Using z.any() for file uploads
  status: z.string().min(1, { message: 'Status is required.' }),
  link: z.string().url({ message: 'Please enter a valid URL.' }),
  services: z.string().min(1, { message: 'Services are required.' }),
});

const PartnerForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      status: '',
      link: '',
      services: '',
    },
  });

  // react-hook-form's `register` is needed for file inputs
  const logoRef = form.register('logo');

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('status', values.status);
    formData.append('link', values.link);
    formData.append('services', values.services);

    // Append the file if it exists
    if (values.logo && values.logo[0]) {
      formData.append('logo', values.logo[0]);
    }

    const result = await addPartner(formData);

    if (result?.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Partner added successfully.',
      });
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Partner Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter partner name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" {...logoRef} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Input placeholder="Enter status" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter website link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Services (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Service 1, Service 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add Partner</Button>
      </form>
    </Form>
  );
};

export default PartnerForm;
