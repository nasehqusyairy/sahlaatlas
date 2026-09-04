// Tabel perantara untuk menghubungkan Discount dan Catalog
export type CatalogDiscount = {
    id: string;
    catalog_id: string;   // Produk mana
    discount_id: string;  // Dikenakan diskon yang mana
};