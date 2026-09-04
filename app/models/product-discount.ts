// Tabel perantara untuk menghubungkan Discount dan Product
export type ProductDiscount = {
    id: string;
    product_id: string;   // Produk mana
    discount_id: string;  // Dikenakan diskon yang mana
};