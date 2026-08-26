import { Quote, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel";

const TESTIMONIALS = [
    {
        id: 1,
        name: "Marcus Vance",
        role: "Head Roaster, Apex Coffee (USA)",
        avatar: "https://i.pravatar.cc/150?img=11",
        rating: 5,
        comment:
            "The Specialty Arabica beans we sourced are exceptional. Distinct flavor profiles and consistent moisture levels in every single shipment.",
    },
    {
        id: 2,
        name: "Elena Rostova",
        role: "Import Director, Bean & Co. (Germany)",
        avatar: "https://i.pravatar.cc/150?img=5",
        rating: 5,
        comment:
            "Flawless export logistics and full documentation compliance. Their green coffee beans consistently score 85+ on Q-grading.",
    },
    {
        id: 3,
        name: "Kenji Sato",
        role: "Owner, Cafe Artisan (Japan)",
        avatar: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        comment:
            "The ethical sourcing transparency and fair trade practices make them our most trusted green coffee supplier in Southeast Asia.",
    },
    {
        id: 4,
        name: "David Miller",
        role: "Procurement Lead, Origin Coffee (UK)",
        avatar: "https://i.pravatar.cc/150?img=9",
        rating: 5,
        comment:
            "Sample requests were delivered rapidly, and the container-scale order matched the sample quality perfectly. Highly recommended!",
    },
];

export function TestimonySection() {
    return (
        <section id="testimony" className="py-12">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">What Our Global Partners Say</h2>
                    <p className="text-muted-foreground">
                        Hear from roasters and distributors worldwide who trust our premium green coffee bean exports.
                    </p>
                </div>

                {/* Testimonial Carousel */}
                <Carousel className="w-full max-w-5xl mx-auto">
                    <CarouselContent className="-ml-4">
                        {TESTIMONIALS.map((item) => (
                            <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="h-full p-1">
                                    <Card className="h-full flex flex-col justify-between">
                                        <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                                            <div className="space-y-3">
                                                {/* Quote Icon & Rating */}
                                                <div className="flex justify-between items-center">
                                                    <Quote className="size-6 text-primary/30" />
                                                    <div className="flex gap-0.5">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`size-4 ${i < item.rating
                                                                    ? "fill-yellow-400 text-yellow-400"
                                                                    : "text-muted opacity-40"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Comment */}
                                                <p className="text-sm text-muted-foreground leading-relaxed italic">
                                                    "{item.comment}"
                                                </p>
                                            </div>

                                            {/* User Info */}
                                            <div className="flex items-center gap-3 pt-4 border-t border-border">
                                                <Avatar className="size-10">
                                                    <AvatarImage src={item.avatar} alt={item.name} />
                                                    <AvatarFallback>
                                                        {item.name.slice(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="text-sm font-semibold leading-none">{item.name}</h3>
                                                    <p className="text-xs text-muted-foreground mt-1">{item.role}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8">
                        <CarouselPrevious className="static translate-y-0" />
                        <CarouselNext className="static translate-y-0" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
}