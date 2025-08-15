import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';

export function parseRichText(content: any): string {
  if (typeof content === 'string') {
    return content;
  }

  if (typeof content === 'object' && content !== null) {
    try {
      // Assuming content is a Tiptap JSON object
      return generateHTML(content, [
        StarterKit,
        // Add any other extensions you use here
      ]);
    } catch (error) {
      console.error('Error parsing rich text content:', error);
      // Fallback for invalid objects
      return '';
    }
  }

  // Fallback for other types or null/undefined
  return '';
}
