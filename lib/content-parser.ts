import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';

export function parseRichText(content: any): string {
  if (typeof content === 'string') {
    return content;
  }

  if (typeof content === 'object' && content !== null) {
    try {
      return generateHTML(content, [
        StarterKit,
      ]);
    } catch (error) {
      console.error('Error parsing rich text content:', error);
      return '';
    }
  }

  return '';
}
