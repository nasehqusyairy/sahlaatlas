import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel"
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

function MenuCard() {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src="https://avatar.vercel.sh/shadcn1"
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
                <CardAction>
                </CardAction>
                <CardTitle>Lorem Ipsum</CardTitle>
                <CardDescription>
                    $ 5.00
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button className="w-full">Add to Cart</Button>
            </CardFooter>
        </Card>
    )
}


function MenuCarousel() {
    return (
        <Carousel className="w-full">
            <CarouselContent className="-ml-1">
                {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/3">
                        <MenuCard />
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* Wrapper untuk mengetengahkan tombol */}
            <div className="flex justify-center gap-4 mt-4">
                <CarouselPrevious className="static" />
                <CarouselNext className="static" />
            </div>
        </Carousel>
    )
}


export function MenuSection() {
    return (
        <section id="menu" className="py-12 bg-primary">
            <div className="container mx-auto p-4">
                <div className="mb-4 text-primary-foreground">
                    <h2 className="text-2xl">Lorem Ipsum</h2>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <MenuCarousel />
            </div>
        </section>
    )
}