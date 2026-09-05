// Join table connecting discounts and products.
export type ProductDiscount = {
    id: string;
    product_id: string;   // Produk mana
    discount_id: string;  // Dikenakan diskon yang mana
};