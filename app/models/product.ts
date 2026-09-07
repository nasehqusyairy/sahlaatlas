import type { Discount } from "./discount";
import type { Tag } from "./tag";

export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    img: string;
    tags: Tag[];
    // Saat diambil dari database, produk bisa membawa daftar diskon yang berlaku
    discounts?: Discount[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

export type ProductWithTagLinks = Omit<Product, "tags"> & {
    product_tags?: Array<{ tags: Tag | null }>;
};