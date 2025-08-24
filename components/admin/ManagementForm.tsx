'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormProvider } from 'react-hook-form';
import { addManagement, updateManagement } from './people-actions';
import { useToast } from '@/hooks/use-toast';
import { SectionEditor } from './section-editor';

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
  image: z.any().optional(),
  sections: z.array(sectionSchema).optional(),
});

type ManagementFormValues = z.infer<typeof formSchema>;

export default function ManagementForm({ management, onFinished }: { management?: any; onFinished: () => void }) {
  const { toast } = useToast();
  const isEditMode = !!management;

  const form = useForm<ManagementFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: management || {
      name: '',
      position: '',
      company: '',
      person_group: '',
      sections: [],
    },
  });

  const imageRef = form.register('image');

  const onSubmit = async (values: ManagementFormValues) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('position', values.position);
    formData.append('company', values.company || '');
    formData.append('person_group', values.person_group || '');
    if (values.image?.[0]) {
        formData.append('image', values.image[0]);
    }

    if (values.sections && values.sections.length > 0) {
        const sectionsWithFilePaths = await Promise.all(values.sections.map(async (section, sectionIndex) => {
            const contentWithFilePaths = await Promise.all(section.content.map(async (contentBlock, contentIndex) => {
                if (contentBlock.content_type === 'image_with_description' && contentBlock.content.image?.[0]) {
                    const imageFile = contentBlock.content.image[0];
                    formData.append(`section_image_${sectionIndex}_${contentIndex}`, imageFile);
                    return { ...contentBlock, content: { ...contentBlock.content, image: imageFile.name } };
                }
                return contentBlock;
            }));
            return { ...section, content: contentWithFilePaths };
        }));
        formData.append('sections', JSON.stringify(sectionsWithFilePaths));
    }

    const result = isEditMode
      ? await updateManagement(management.id, formData)
      : await addManagement(formData);

    if (result?.error) {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: result.success });
      onFinished();
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
          <h3 className="text-lg font-semibold mb-4">{isEditMode ? 'Edit Management Person' : 'Add New Management Person'}</h3>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder="Management Person's Name" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="position" render={({ field }) => (
            <FormItem><FormLabel>Position</FormLabel><FormControl><Input placeholder="Management Person's Position" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="company" render={({ field }) => (
            <FormItem><FormLabel>Company (Optional)</FormLabel><FormControl><Input placeholder="Company Name" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="person_group" render={({ field }) => (
            <FormItem><FormLabel>Group (Optional)</FormLabel><FormControl><Input placeholder="Group Name" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="image" render={() => (
              <FormItem><FormLabel>Image {isEditMode && '(leave blank to keep existing)'}</FormLabel><FormControl><Input type="file" accept="image/*" {...imageRef} /></FormControl><FormMessage /></FormItem>
          )} />
          <SectionEditor uploadOnSubmit={true} />
          <div className="flex gap-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Management Person' : 'Add Management Person')}
            </Button>
            {isEditMode && <Button type="button" variant="outline" onClick={onFinished}>Cancel</Button>}
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};
