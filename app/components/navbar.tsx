import { useState } from "react";
import { Link } from "react-router";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/components/ui/collapsible";

// Data item navbar terpusat
const NAV_ITEMS = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    // {
    //     label: "Our Commodities",
    //     children: [
    //         { label: "Coffee", href: "#coffee" },
    //         { label: "Cocoa", href: "#cocoa" },
    //         { label: "Tea", href: "#tea" },
    //     ],
    // },
    { label: "Catalog", href: "#catalog" },
    { label: "Blog", href: "#blog" },
];

export function Navbar() {
    // State untuk kontrol menu collapse utama di mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // State untuk accordion submenu di mobile
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    const toggleSubmenu = (label: string) => {
        setOpenSubmenu((prev) => (prev === label ? null : label));
    };

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
                    {/* <nav className="flex items-center gap-6 text-sm font-medium">
                        {NAV_ITEMS.map((item, index) =>
                            item.children ? (
                                <DropdownMenu key={index}>
                                    <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors outline-none cursor-pointer">
                                        {item.label}
                                        <ChevronDown className="w-4 h-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start" className="w-40">
                                        {item.children.map((child, childIndex) => (
                                            <DropdownMenuItem key={childIndex}>
                                                <Link to={child.href} className="w-full">
                                                    {child.label}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="hover:text-primary transition-colors"
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </nav> */}
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
                    {/* <nav className="flex flex-col gap-1">
                        {NAV_ITEMS.map((item, index) =>
                            item.children ? (
                                <Collapsible
                                    key={index}
                                    open={openSubmenu === item.label}
                                    onOpenChange={() => toggleSubmenu(item.label)}
                                >
                                    <CollapsibleTrigger className="flex items-center justify-between w-full text-base font-medium px-3 py-2 hover:bg-card hover:text-primary transition-colors outline-none">
                                        {item.label}
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-200 ${openSubmenu === item.label ? "rotate-180" : ""
                                                }`}
                                        />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pl-3 pt-1 flex flex-col gap-1">
                                        {item.children.map((child, childIndex) => (
                                            <Link
                                                key={childIndex}
                                                to={child.href}
                                                className="text-sm font-normal px-3 py-2 hover:bg-card hover:text-primary transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            ) : (
                                <Link
                                    key={index}
                                    to={item.href}
                                    className="text-base font-medium px-3 py-2 hover:bg-card hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            )
                        )}
                    </nav> */}
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