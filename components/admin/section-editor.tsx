'use client';

import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, X, Image as ImageIcon, FileText } from 'lucide-react';
import dynamic from 'next/dynamic';
import ClientOnly from '../ui/client-only';
import type { Section } from '@/types/content';

const RichTextEditor = dynamic(() => import('../ui/rich-text-editor'), { ssr: false });

const ContentBlock = ({ sectionIndex, contentIndex, removeContent, layout, uploadOnSubmit }: { sectionIndex: number, contentIndex: number, removeContent: (index: number) => void, layout: 'one_column' | 'two_column', uploadOnSubmit?: boolean }) => {
  const { control, register } = useFormContext();

  return (
    <div className="p-4 border rounded-md space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Content Block {contentIndex + 1}</h4>
        <Button type="button" variant="ghost" size="icon" onClick={() => removeContent(contentIndex)}>
          <X className="h-4 w-4 text-destructive" />
        </Button>
      </div>
      <FormField
        control={control}
        name={`sections.${sectionIndex}.content.${contentIndex}.content_type`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Content Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="image_with_description">Image with Description</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <Controller
        control={control}
        name={`sections.${sectionIndex}.content.${contentIndex}.content_type`}
        render={({ field }) => (
          <>
            {field.value === 'text' && (
              <FormField
                control={control}
                name={`sections.${sectionIndex}.content.${contentIndex}.content.text`}
                render={({ field: richTextField }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <ClientOnly>
                        <RichTextEditor value={richTextField.value} onChange={richTextField.onChange} />
                      </ClientOnly>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {field.value === 'image_with_description' && (
              <div className="space-y-4">
                <FormField
                  control={control}
                  name={`sections.${sectionIndex}.content.${contentIndex}.content.image`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            if (uploadOnSubmit) {
                              field.onChange(e.target.files);
                            } else {
                              const formData = new FormData();
                              formData.append("file", file);

                              const res = await fetch("/api/upload", {
                                method: "POST",
                                body: formData,
                              });

                              const data = await res.json();
                              field.onChange(data.url); // save blob URL to form
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`sections.${sectionIndex}.content.${contentIndex}.content.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </>
        )}
      />
    </div>
  );
};


const Section = ({ sectionIndex, removeSection, uploadOnSubmit }: { sectionIndex: number, removeSection: (index: number) => void, uploadOnSubmit?: boolean }) => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.content`
  });

  const layout = watch(`sections.${sectionIndex}.layout`);

  return (
    <div className="p-4 border rounded-md space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Section {sectionIndex + 1}</h3>
        <Button type="button" variant="ghost" size="icon" onClick={() => removeSection(sectionIndex)}>
          <X className="h-4 w-4 text-destructive" />
        </Button>
      </div>
      <FormField
        control={control}
        name={`sections.${sectionIndex}.layout`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Layout</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="one_column">One Column</SelectItem>
                <SelectItem value="two_column">Two Columns</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <FormLabel>Content</FormLabel>
        <div className={`mt-2 grid gap-4 ${layout === 'two_column' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
          {fields.map((field, index) => (
            <ContentBlock key={field.id} sectionIndex={sectionIndex} contentIndex={index} removeContent={remove} layout={layout} uploadOnSubmit={uploadOnSubmit} />
          ))}
        </div>
        <Button type="button" variant="outline" onClick={() => append({ content_type: 'text', content: { text: '' } })} className="mt-4">
          <PlusCircle className="h-4 w-4 mr-2" />Add Content Block
        </Button>
      </div>
    </div>
  );
}


export const SectionEditor = ({ uploadOnSubmit }: { uploadOnSubmit?: boolean }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections"
  });

  return (
    <div className="space-y-4">
      <FormLabel>Sections</FormLabel>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <Section key={field.id} sectionIndex={index} removeSection={remove} uploadOnSubmit={uploadOnSubmit} />
        ))}
        <Button type="button" variant="outline" onClick={() => append({ layout: 'one_column', content: [] })}>
          <PlusCircle className="h-4 w-4 mr-2" />Add Section
        </Button>
      </div>
    </div>
  );
};
