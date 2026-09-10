import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import type { Product } from "~/models/product";

// ==========================================
// 3. KOMPONEN PRODUCT CARD
// ==========================================

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <Card>
            <img src={product.img} alt={product.title} className="aspect-square w-full object-cover" />
            <CardHeader>
                <div className="flex flex-wrap gap-1">
                    {product.tags.map((tag) => (
                        <Badge key={tag.id} variant="secondary">
                            {tag.name}
                        </Badge>
                    ))}
                </div>
                <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{product.description}</CardDescription>
            </CardContent>
        </Card>
    );
}

// ==========================================
// 4. KOMPONEN PRODUCT LIST (SECTION)
// ==========================================

export function ProductList({ products }: { products: Product[] }) {
    return (
        <section
            id="contact"
            className="relative py-12 bg-fixed bg-center bg-cover bg-no-repeat overflow-hidden"
            style={{
                // Commodity/agriculture background with a parallax effect via bg-fixed.
                backgroundImage: `url('/images/contact.jpg')`,
            }}
        >
            {/* Dark overlay to improve text legibility. */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            <div className="container mx-auto p-4 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductList;