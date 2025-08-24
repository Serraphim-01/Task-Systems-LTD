'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, X, Trash2, Edit } from 'lucide-react';
import { SectionEditor } from './section-editor';
import { addEvent, updateEvent, deleteEvent } from './actions';
import { FormProvider } from 'react-hook-form';

// --- Zod Schemas ---
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
  time: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  image: z.any().optional(),
  document: z.any().optional(),
  expires_at: z.string().optional(),
  links: z.array(linkSchema).optional(),
  sections: z.array(sectionSchema).optional(),
});
type EventFormValues = z.infer<typeof formSchema>;


// --- Event Form (for Add/Edit) ---
function EventForm({ event, onFinished }: { event?: any; onFinished: () => void }) {
  const { toast } = useToast();
  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: event ? {
        ...event,
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
        expires_at: event.expires_at ? new Date(event.expires_at).toISOString().split('T')[0] : '',
        links: event.links ? JSON.parse(event.links) : [],
    } : {
      title: '',
      short_description: '',
      time: '',
      date: '',
      location: '',
      expires_at: '',
      links: [],
      sections: [],
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'links' });
  const imageRef = form.register('image');
  const documentRef = form.register('document');
  const isEditMode = !!event;

  const onSubmit = async (values: EventFormValues) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('short_description', values.short_description || '');
    formData.append('time', values.time || '');
    formData.append('date', values.date || '');
    formData.append('location', values.location || '');
    if (values.expires_at) formData.append('expires_at', new Date(values.expires_at).toISOString());
    if (values.image?.[0]) formData.append('image', values.image[0]);
    if (values.document?.[0]) formData.append('document', values.document[0]);
    if (values.links && values.links.length > 0) formData.append('links', JSON.stringify(values.links));
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
      ? await updateEvent(event.id, formData)
      : await addEvent(formData);

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold mb-6">{isEditMode ? 'Edit Event' : 'Add New Event'}</h2>
        <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input placeholder="Event Title" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6"><FormField control={form.control} name="date" render={({ field }) => (<FormItem><FormLabel>Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} /><FormField control={form.control} name="time" render={({ field }) => (<FormItem><FormLabel>Time</FormLabel><FormControl><Input type="time" {...field} /></FormControl><FormMessage /></FormItem>)} /><FormField control={form.control} name="location" render={({ field }) => (<FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="Event Location" {...field} /></FormControl><FormMessage /></FormItem>)} /></div>
        <FormField control={form.control} name="short_description" render={({ field }) => (<FormItem><FormLabel>Short Description</FormLabel><FormControl><Textarea placeholder="A brief summary" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <SectionEditor uploadOnSubmit />
        <FormField control={form.control} name="image" render={() => (<FormItem><FormLabel>Image {isEditMode && '(leave blank to keep existing)'}</FormLabel><FormControl><Input type="file" accept="image/*" {...imageRef} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="document" render={() => (<FormItem><FormLabel>Document {isEditMode && '(leave blank to keep existing)'}</FormLabel><FormControl><Input type="file" accept=".pdf,.doc,.docx" {...documentRef} /></FormControl><FormMessage /></FormItem>)} />
        <FormField control={form.control} name="expires_at" render={({ field }) => (<FormItem><FormLabel>Expiration Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
        <div><FormLabel>Links</FormLabel><div className="space-y-4 mt-2">{fields.map((field, index) => (<div key={field.id} className="flex items-center gap-4 p-4 border rounded-md"><FormField control={form.control} name={`links.${index}.text`} render={({ field }) => (<FormItem className="flex-1"><FormLabel>Link Text</FormLabel><FormControl><Input placeholder="e.g., Read More" {...field} /></FormControl><FormMessage /></FormItem>)} /><FormField control={form.control} name={`links.${index}.url`} render={({ field }) => (<FormItem className="flex-1"><FormLabel>Link URL</FormLabel><FormControl><Input placeholder="https://example.com" {...field} /></FormControl><FormMessage /></FormItem>)} /><Button type="button" variant="ghost" onClick={() => remove(index)} className="mt-8"><X className="h-4 w-4 text-destructive" /></Button></div>))}<Button type="button" variant="outline" onClick={() => append({ text: '', url: '' })}><PlusCircle className="h-4 w-4 mr-2" />Add Link</Button></div></div>
        <Button type="submit" disabled={form.formState.isSubmitting}>{isEditMode ? 'Update' : 'Add'} Event</Button>
        {isEditMode && <Button type="button" variant="outline" onClick={onFinished}>Cancel</Button>}
      </form>
    </Form>
    </FormProvider>
  );
}

// --- Event List ---
function EventList({ events, onEdit }: { events: any[], onEdit: (event: any) => void }) {
    const { toast } = useToast();
    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this event?')) {
            const result = await deleteEvent(id);
            if (result.error) toast({ title: 'Error', description: result.error, variant: 'destructive' });
            else toast({ title: 'Success', description: result.success });
        }
    };
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Existing Events</h2>
            <div className="space-y-4">
                {events.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <p className="font-bold">{item.title}</p>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => onEdit(item)}><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// --- Main Editor Component ---
export function EventEditor({ events }: { events: any[] }) {
    const [editingEvent, setEditingEvent] = useState<any | null>(null);

    const handleEdit = (event: any) => {
        setEditingEvent(event);
    };

    const handleFinished = () => {
        setEditingEvent(null);
    };

    return (
        <div className="grid md:grid-cols-2 gap-12">
            <div>
                {editingEvent ? (
                    <EventForm event={editingEvent} onFinished={handleFinished} />
                ) : (
                    <EventForm onFinished={handleFinished} />
                )}
            </div>
            <div>
                <EventList events={events} onEdit={handleEdit} />
            </div>
        </div>
    );
}
