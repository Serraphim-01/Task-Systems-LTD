'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { addEvent } from './actions';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, X } from 'lucide-react';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('../ui/rich-text-editor'), { ssr: false });

const linkSchema = z.object({
  text: z.string().min(1, 'Link text is required.'),
  url: z.string().url('Invalid URL format.'),
});

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  short_description: z.string().optional(),
  full_text: z.string().optional(),
  "time": z.string().optional(),
  "date": z.string().optional(),
  location: z.string().optional(),
  image: z.any().optional(),
  document: z.any().optional(),
  expires_at: z.string().optional(),
  links: z.array(linkSchema).optional(),
});

type EventFormValues = z.infer<typeof formSchema>;

const EventForm = () => {
  const { toast } = useToast();
  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      short_description: '',
      full_text: '',
      time: '',
      date: '',
      location: '',
      expires_at: '',
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'links',
  });

  const imageRef = form.register('image');
  const documentRef = form.register('document');

  const onSubmit = async (values: EventFormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('short_description', values.short_description || '');
    formData.append('full_text', values.full_text || '');
    formData.append('time', values.time || '');
    formData.append('date', values.date || '');
    formData.append('location', values.location || '');

    if (values.expires_at) {
      formData.append('expires_at', new Date(values.expires_at).toISOString());
    }

    if (values.image?.[0]) {
      formData.append('image', values.image[0]);
    }
    if (values.document?.[0]) {
      formData.append('document', values.document[0]);
    }
    if (values.links && values.links.length > 0) {
      formData.append('links', JSON.stringify(values.links));
    }

    const result = await addEvent(formData);

    if (result?.error) {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: result.success });
      form.reset();
      remove();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField control={form.control} name="title" render={({ field }) => (
          <FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Event Title" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField control={form.control} name="date" render={({ field }) => (
            <FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="time" render={({ field }) => (
            <FormItem><FormLabel>Time</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="location" render={({ field }) => (
            <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="Event Location" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>

        <FormField control={form.control} name="short_description" render={({ field }) => (
          <FormItem><FormLabel>Short Description (Optional)</FormLabel><FormControl><Textarea placeholder="A brief summary of the event" {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField
          control={form.control}
          name="full_text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Details (Optional)</FormLabel>
              <FormControl>
                <RichTextEditor
                  {...field}
                  value={field.value ?? ""} // ensure always string
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField control={form.control} name="image" render={({ field }) => (
          <FormItem><FormLabel>Image (Optional)</FormLabel><FormControl><Input type="file" accept="image/*" {...imageRef} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="document" render={({ field }) => (
          <FormItem><FormLabel>Document (Optional)</FormLabel><FormControl><Input type="file" accept=".pdf,.doc,.docx" {...documentRef} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField control={form.control} name="expires_at" render={({ field }) => (
          <FormItem><FormLabel>Expiration Date (Optional)</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
        )} />

        <div>
          <FormLabel>Links (Optional)</FormLabel>
          <div className="space-y-4 mt-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4 p-4 border rounded-md">
                <FormField control={form.control} name={`links.${index}.text`} render={({ field }) => (
                  <FormItem className="flex-1"><FormLabel>Link Text</FormLabel><FormControl><Input placeholder="e.g., Register Now" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name={`links.${index}.url`} render={({ field }) => (
                  <FormItem className="flex-1"><FormLabel>Link URL</FormLabel><FormControl><Input placeholder="https://example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="button" variant="ghost" onClick={() => remove(index)} className="mt-8"><X className="h-4 w-4 text-destructive" /></Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => append({ text: '', url: '' })}><PlusCircle className="h-4 w-4 mr-2" />Add Link</Button>
          </div>
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Adding Event..." : "Add Event"}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;
