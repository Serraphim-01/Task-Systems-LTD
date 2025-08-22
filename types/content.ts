// types/content.ts
export type ContentBlock =
  | {
      content_type: "text";
      content: { text: string };
    }
  | {
      content_type: "image_with_description";
      content: { image: string; description: string };
    };

export type Section = {
  layout: "one_column" | "two_column";
  content: ContentBlock[];
};
