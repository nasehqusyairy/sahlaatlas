import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel"
import { Button } from "../ui/button";

const arr = [
    'Menu 1',
    'Menu 2',
    'Menu 3',
    'Menu 4',
    'Menu 5'
]

type MenuCardProps = {
    title: string
}

function MenuCard(props: MenuCardProps) {
    return (
        <Card className="relative mx-auto w-full max-w-sm pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img loading="lazy"
                src="https://avatar.vercel.sh/shadcn1"
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
                <CardTitle>{props.title}</CardTitle>
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
            {/* Wrapper untuk mengetengahkan tombol */}
            <div className="flex gap-4 mb-4 text-white">
                <CarouselPrevious className="static" />
                <CarouselNext className="static" />
            </div>

            <CarouselContent className="-ml-1">
                {arr.map((item, index) => (
                    <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/4">
                        <MenuCard title={item} />
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className="text-primary-foreground mt-12 lg:flex justify-end">
                <Button variant="outline" size="lg" className={'w-full lg:w-auto'}>
                    See More
                </Button>
            </div>

        </Carousel>
    )
}


export function MenuSection() {
    return (
        <section id="menu" className="py-4 bg-primary">
            <div className="container mx-auto p-4">
                <div className="mb-4 text-primary-foreground">
                    <h2 className="text-2xl lg:text-4xl font-bold">Product</h2>
                    <p>Lorem ipsum dolor sit amet</p>
                </div>
                <MenuCarousel />
            </div>
        </section>
    )
}