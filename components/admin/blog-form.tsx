'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { addBlog } from './actions';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, X } from 'lucide-react';

const linkSchema = z.object({
  text: z.string().min(1, 'Link text is required.'),
  url: z.string().url('Invalid URL format.'),
});

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  short_description: z.string().optional(),
  full_text: z.string().min(1, { message: 'Full text is required.' }),
  author: z.string().optional(),
  image: z.any().optional(),
  document: z.any().optional(),
  expires_at: z.string().optional(),
  links: z.array(linkSchema).optional(),
});

type BlogFormValues = z.infer<typeof formSchema>;

const BlogForm = () => {
  const { toast } = useToast();
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      short_description: '',
      full_text: '',
      author: '',
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'links',
  });

  const imageRef = form.register('image');
  const documentRef = form.register('document');

  const onSubmit = async (values: BlogFormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('short_description', values.short_description || '');
    formData.append('full_text', values.full_text);
    formData.append('author', values.author || '');

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

    const result = await addBlog(formData);

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
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl><Input placeholder="Blog Post Title" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="author" render={({ field }) => (
          <FormItem>
            <FormLabel>Author (Optional)</FormLabel>
            <FormControl><Input placeholder="Author's Name" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="short_description" render={({ field }) => (
          <FormItem>
            <FormLabel>Short Description (Optional)</FormLabel>
            <FormControl><Textarea placeholder="A brief summary of the blog post" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="full_text" render={({ field }) => (
          <FormItem>
            <FormLabel>Full Text</FormLabel>
            <FormControl><Textarea placeholder="The main content of the blog post" rows={10} {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="image" render={({ field }) => (
            <FormItem>
                <FormLabel>Image (Optional)</FormLabel>
                <FormControl><Input type="file" accept="image/*" {...imageRef} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField control={form.control} name="document" render={({ field }) => (
            <FormItem>
                <FormLabel>Document (Optional)</FormLabel>
                <FormControl><Input type="file" accept=".pdf,.doc,.docx" {...documentRef} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />
        <FormField control={form.control} name="expires_at" render={({ field }) => (
            <FormItem>
                <FormLabel>Expiration Date (Optional)</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
            </FormItem>
        )} />

        <div>
          <FormLabel>Links (Optional)</FormLabel>
          <div className="space-y-4 mt-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-4 p-4 border rounded-md">
                <FormField control={form.control} name={`links.${index}.text`} render={({ field }) => (
                  <FormItem className="flex-1"><FormLabel>Link Text</FormLabel><FormControl><Input placeholder="e.g., Read More" {...field} /></FormControl><FormMessage /></FormItem>
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
            {form.formState.isSubmitting ? "Adding Post..." : "Add Blog Post"}
        </Button>
      </form>
    </Form>
  );
};

export default BlogForm;
