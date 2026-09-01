export type Article = {
  id: string;
  slug: string;
  title: string;
  author: string;
  content: string;
  is_published:boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export const articles: Article[] = [
    {
        id: "1",
        slug: "panduan-nextjs-14",
        title: "Panduan Lengkap Next.js 14 untuk Pemula",
        author: "Budi Santoso",
        content: "Next.js 14 membawa banyak peningkatan performa...",
        is_published:true,
        created_at: "2024-01-15T08:00:00Z",
        updated_at: "2024-01-16T10:30:00Z",
        deleted_at: null,
    },
    {
        id: "2",
        slug: "mengenal-shadcn-ui",
        title: "Mengenal Shadcn UI: Komponen UI yang Fleksibel",
        author: "Siti Rahma",
        content: "Shadcn UI bukan library komponen biasa...",
        is_published:false,
        created_at: "2024-02-01T09:15:00Z",
        updated_at: "2024-02-01T09:15:00Z",
        deleted_at: null,
    },
    {
        id: "3",
        slug: "tips-typescript-clean-code",
        title: "10 Tips Menulis TypeScript yang Lebih Rapi",
        author: "Budi Santoso",
        content: "Penggunaan generics dan utility types yang tepat...",
        is_published:false,
        created_at: "2024-02-10T14:20:00Z",
        updated_at: "2024-02-12T11:00:00Z",
        deleted_at: "2024-02-20T16:00:00Z", // Contoh soft delete
    },
];