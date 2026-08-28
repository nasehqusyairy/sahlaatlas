import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
    return (
        <div className="relative h-14">
            <div className="fixed top-0 z-30 w-full p-4 bg-background shadow">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <img src="/images/logo.png" alt="logo" className="size-12" />
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
        </div>
    )
}