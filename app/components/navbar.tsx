import { useState } from "react";
import { Link } from "react-router";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
} from "~/components/ui/collapsible";

// Data item navbar terpusat
const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Product", href: "/product" },
    { label: "Blog", href: "/blog" },
];

export function Navbar() {
    // State untuk kontrol menu collapse utama di mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full shadow bg-background">
            {/* Main Navbar Bar */}
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img loading="lazy" src="/images/logo.png" alt="PT Sahla Atlas Export" className="h-12 w-auto" />
                </Link>

                {/* Navigation (Desktop) */}
                <div className="hidden md:flex items-center gap-6">
                    <nav className="flex items-center gap-6 text-sm font-medium">
                        {NAV_ITEMS.map((item, index) => (
                            <Link
                                key={index}
                                to={item.href}
                                className="hover:text-primary transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <Button variant="default" className="gap-2">
                        Shopping Cart
                    </Button>
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex md:hidden items-center gap-2">
                    <Button size="icon" aria-label="Shopping Cart">
                        <ShoppingCart className="w-4 h-4" />
                    </Button>

                    {/* Button Toggle Mobile Menu */}
                    <Button
                        variant="outline"
                        size="icon"
                        aria-label="Toggle Menu"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-4 h-4" />
                        ) : (
                            <Menu className="w-4 h-4" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Navigation Menu (Collapsible Body) */}
            <Collapsible open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} className="md:hidden">
                <CollapsibleContent className="border-t px-4 py-4 bg-background shadow-lg transition-all">
                    <nav className="flex flex-col gap-1">
                        {NAV_ITEMS.map((item, index) => (
                            <Link
                                key={index}
                                to={item.href}
                                className="text-base font-medium px-3 py-2 hover:bg-card hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </CollapsibleContent>
            </Collapsible>
        </header>
    );
}