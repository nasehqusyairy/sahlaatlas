import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel";
import type { Product } from "~/models/product";

function ProductCarouselCard({ product }: { product: Product }) {
    return (
        <Card className="h-full">
            <img src={product.img} alt={product.title} loading="lazy" className="aspect-square w-full object-cover" />
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

export function ProductCarousel({ products }: { products: Product[] }) {
    return (
        <section className="relative overflow-hidden bg-fixed bg-center bg-cover bg-no-repeat py-12" style={{ backgroundImage: "url('/images/contact.jpg')" }}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            <div className="container relative z-10 mx-auto px-4">
                {products.length > 0 ? (
                    <Carousel opts={{ align: "start" }} className="pt-14">
                        <CarouselPrevious className="inset-auto left-0 top-0 translate-y-0 text-primary-foreground" />
                        <CarouselNext className="inset-auto left-11 top-0 translate-y-0 text-primary-foreground" />
                        <CarouselContent className="-ms-2">
                            {products.map((product) => (
                                <CarouselItem key={product.id} className="basis-full ps-2 sm:basis-1/2 lg:basis-1/4">
                                    <ProductCarouselCard product={product} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                ) : (
                    <div className="border border-dashed border-white/20 py-20 text-center text-white/60">
                        Belum ada produk yang tersedia.
                    </div>
                )}
            </div>
        </section>
    );
}
