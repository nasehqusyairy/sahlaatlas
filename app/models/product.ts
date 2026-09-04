import type { Discount } from "./discount";

export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    img: string;
    // Saat diambil dari database, produk bisa membawa daftar diskon yang berlaku
    discounts?: Discount[];
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};