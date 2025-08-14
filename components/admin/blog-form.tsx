'use client';

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
import { SectionEditor } from './section-editor';

const linkSchema = z.object({
  text: z.string().min(1, 'Link text is required.'),
  url: z.string().url('Invalid URL format.'),
});

const contentSchema = z.object({
  content_type: z.enum(['text', 'image_with_description']),
  content: z.any(),
});

const sectionSchema = z.object({
  layout: z.enum(['one_column', 'two_column']),
  content: z.array(contentSchema),
});

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  short_description: z.string().optional(),
  author: z.string().optional(),
  image: z.any().optional(),
  document: z.any().optional(),
  expires_at: z.string().optional(),
  links: z.array(linkSchema).optional(),
  sections: z.array(sectionSchema).optional(),
});

type BlogFormValues = z.infer<typeof formSchema>;

const BlogForm = () => {
  const { toast } = useToast();
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      short_description: '',
      author: '',
      expires_at: '',
      links: [],
      sections: [],
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
    if (values.sections && values.sections.length > 0) {
        // Handle file uploads in sections
        const sectionsWithFilePaths = await Promise.all(values.sections.map(async (section, sectionIndex) => {
            const contentWithFilePaths = await Promise.all(section.content.map(async (contentBlock, contentIndex) => {
                if (contentBlock.content_type === 'image_with_description' && contentBlock.content.image?.[0]) {
                    const imageFile = contentBlock.content.image[0];
                    formData.append(`section_image_${sectionIndex}_${contentIndex}`, imageFile);
                    return {
                        ...contentBlock,
                        content: {
                            ...contentBlock.content,
                            image: imageFile.name, // or a placeholder to be replaced by the server
                        }
                    };
                }
                return contentBlock;
            }));
            return { ...section, content: contentWithFilePaths };
        }));
        formData.append('sections', JSON.stringify(sectionsWithFilePaths));
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

        <SectionEditor />

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
                  <FormItem className="flex-1"><FormLabel>Link URL</FormLabel><FormControl><Input placeholder="https://example.com" {...field} /></FormControl><FormMessage /></FormMessage>
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
