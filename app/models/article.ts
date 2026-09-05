import type { Tag } from "./tag";

export type Article = {
  id: string;
  slug: string;
  title: string;
  author: string;
  tags?: Tag[];
  cover: string;
  content: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};
