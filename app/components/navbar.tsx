import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
    return (
        <div className="relative h-14">
            <div className="fixed top-0 z-20 w-full p-4 bg-muted">
                <div className="flex justify-between items-center">
                    <img src="https://placehold.co/50" alt="logo" className="size-8" />
                    <div className="flex gap-2">
                        <Button variant={'outline'} size={'icon'}>
                            <ShoppingCart />
                        </Button>
                        <Button variant={'outline'} size={'icon'}>
                            <Menu />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}