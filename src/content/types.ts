import type { TagName } from 'foldkit/html';

/** Build-time content data. No component imports or runtime Markdown compiler. */
export type ContentNode =
  | { type: 'text'; value: string }
  | {
      type: 'element';
      tag: Exclude<TagName, 'textarea'>;
      attributes: Record<string, string>;
      children: ContentNode[];
    }
  | {
      type: 'callout';
      id: string;
      kind: 'note' | 'tip' | 'info' | 'warning' | 'danger' | 'success' | 'example' | 'quote';
      title: string;
      collapsible: boolean;
      collapsed: boolean;
      children: ContentNode[];
    };

export interface ContentPage {
  id: string;
  title: string;
  description: string;
  body: ContentNode[];
  headings: { depth: number; slug: string; text: string }[];
  publishDate?: string;
  updatedDate?: string;
  draft: boolean;
  tags: string[];
  ogImage?: string;
  canonical?: string;
  author: string[];
  coverImage?: { src: string; alt: string; width: number; height: number };
  robots?: string;
  readingTime: string;
}
