import { useState } from "react";
import { X } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel";
import type { Photo } from "~/models/photo";

export function GalleryCarousel({ items }: { items: Photo[] }) {
    const [selectedItem, setSelectedItem] = useState<Photo | null>(null);

    return (
        <section id="gallery" className="bg-primary py-16 text-primary-foreground">
            <div className="container mx-auto px-4">
                <h2 className="mx-auto mb-12 max-w-2xl text-center font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
                    Gallery
                </h2>

                {items.length > 0 ? (
                    <Carousel opts={{ align: "start" }} className="pt-14">
                        <CarouselPrevious className="inset-auto left-0 top-0 translate-y-0 border-primary-foreground/30 bg-primary text-primary-foreground hover:bg-primary-foreground/10" />
                        <CarouselNext className="inset-auto left-11 top-0 translate-y-0 border-primary-foreground/30 bg-primary text-primary-foreground hover:bg-primary-foreground/10" />
                        <CarouselContent className="-ms-2">
                            {items.map((item) => (
                                <CarouselItem key={item.id} className="basis-full ps-2 sm:basis-1/2 lg:basis-1/4">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedItem(item)}
                                        className="group relative aspect-square w-full overflow-hidden border border-primary-foreground/15 text-left shadow-lg"
                                    >
                                        <img src={item.src} alt={item.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                                        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                                            <Badge variant="secondary" className="mb-2">
                                                {new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                            </Badge>
                                            <h3 className="line-clamp-2 font-bold">{item.title}</h3>
                                        </div>
                                    </button>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                ) : (
                    <div className="border border-dashed border-primary-foreground/20 py-20 text-center text-primary-foreground/60">
                        Belum ada item galeri yang tersedia.
                    </div>
                )}

                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={() => setSelectedItem(null)}>
                        <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden bg-primary md:flex-row" onClick={(event) => event.stopPropagation()}>
                            <button type="button" onClick={() => setSelectedItem(null)} className="absolute right-4 top-4 z-10 bg-black/60 p-2 text-white" aria-label="Close modal">
                                <X className="h-5 w-5" />
                            </button>
                            <div className="flex w-full items-center justify-center bg-black p-4 md:w-2/3">
                                <img src={selectedItem.src} alt={selectedItem.title} className="max-h-[75vh] max-w-full object-contain" />
                            </div>
                            <div className="w-full p-6 md:w-1/3">
                                <h3 className="mb-3 text-2xl font-bold">{selectedItem.title}</h3>
                                <p className="text-sm text-primary-foreground/80">{selectedItem.description}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
