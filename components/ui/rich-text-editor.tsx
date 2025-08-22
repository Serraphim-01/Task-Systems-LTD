"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (richText: string) => void;
}

const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ value, onChange }, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
      ],
      content: value,
      editorProps: {
        attributes: {
          class:
            'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[150px]',
        },
      },
      onUpdate({ editor }) {
        onChange(editor.getHTML());
      },
    });

    return (
      <div ref={ref} className="border border-input rounded-md min-h-[150px]">
        <EditorContent editor={editor} />
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;
