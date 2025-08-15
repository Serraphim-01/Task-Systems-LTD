'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormProvider } from 'react-hook-form';
import { addDirector } from './people-actions';
import { useToast } from '@/hooks/use-toast';
import { SectionEditor } from './section-editor';
// import * as z from 'zod';

const contentSchema = z.object({
  content_type: z.enum(['text', 'image_with_description']),
  content: z.any(),
});

const sectionSchema = z.object({
  layout: z.enum(['one_column', 'two_column']),
  content: z.array(contentSchema),
});

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  position: z.string().min(1, { message: 'Position is required.' }),
  company: z.string().optional(),
  person_group: z.string().optional(),
  image: z.any().refine((files) => files?.length === 1, 'Image is required.'),
  sections: z.array(sectionSchema).optional(),
});

type DirectorFormValues = z.infer<typeof formSchema>;

const DirectorForm = () => {
  const { toast } = useToast();
  const form = useForm<DirectorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      position: '',
      company: '',
      person_group: '',
      sections: [],
    },
  });

  const imageRef = form.register('image');

  const onSubmit = async (values: DirectorFormValues) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('position', values.position);
    formData.append('company', values.company || '');
    formData.append('person_group', values.person_group || '');
    formData.append('image', values.image[0]);

    if (values.sections && values.sections.length > 0) {
        const sectionsWithFilePaths = await Promise.all(values.sections.map(async (section, sectionIndex) => {
            const contentWithFilePaths = await Promise.all(section.content.map(async (contentBlock, contentIndex) => {
                if (contentBlock.content_type === 'image_with_description' && contentBlock.content.image?.[0]) {
                    const imageFile = contentBlock.content.image[0];
                    formData.append(`section_image_${sectionIndex}_${contentIndex}`, imageFile);
                    return {
                        ...contentBlock,
                        content: {
                            ...contentBlock.content,
                            image: imageFile.name,
                        }
                    };
                }
                return contentBlock;
            }));
            return { ...section, content: contentWithFilePaths };
        }));
        formData.append('sections', JSON.stringify(sectionsWithFilePaths));
    }

    const result = await addDirector(formData);

    if (result?.error) {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: result.success });
      form.reset();
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
          <h3 className="text-lg font-semibold mb-4">Add New Director</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl><Input placeholder="Director's Name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="position" render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl><Input placeholder="Director's Position" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="company" render={({ field }) => (
            <FormItem>
              <FormLabel>Company (Optional)</FormLabel>
              <FormControl><Input placeholder="Company Name" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="person_group" render={({ field }) => (
            <FormItem>
              <FormLabel>Group (Optional)</FormLabel>
              <FormControl><Input placeholder="Group Name" {...field} /></FormControl>
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

          <SectionEditor />

          <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Adding..." : "Add Director"}
          </Button>
        </form>
      </Form>
    </FormProvider>
  );
};

export default DirectorForm;
