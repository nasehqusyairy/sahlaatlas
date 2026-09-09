import { NAVBAR_ITEMS } from '~/models/nav-item';
import { buttonVariants } from './ui/button';
import { Facebook, Linkedin, Pinterest } from "react-bootstrap-icons";
import { Link } from 'react-router';

export function PageFooter() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-12">
                {/* Main Content Grid */}
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand & Logo */}
                    <div className="space-y-4 md:col-span-1">
                        <img loading="lazy"
                            src="/images/logo.png"
                            alt="Coffee Exporter Logo"
                            className="h-12 bg-background p-2"
                        />
                        <p className="text-sm opacity-80 leading-relaxed">
                            Premium green coffee bean exporter supplying high-grade Arabica and Robusta to roasters and distributors worldwide.
                        </p>
                    </div>

                    <div></div>

                    {/* Quick Links Column 1 */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Navigations</h3>
                        <ul className="space-y-2 text-sm opacity-80">
                            {NAVBAR_ITEMS.map((item, index) => (
                                <li key={index}>
                                    <a href={item.url} className="hover:opacity-100 hover:underline transition-all">
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                        <p className="text-sm opacity-80 mb-4">
                            Stay updated with our latest harvest, market trends, and global shipments
                        </p>
                        <div className="flex gap-4">
                            <Link to="https://www.facebook.com/profile.php?id=61593242036051" target='_blank' aria-label="Facebook" className={buttonVariants({ size: 'icon', variant: 'outline' })}>
                                <Facebook className="size-5" />
                            </Link>
                            <Link to="www.linkedin.com/in/sahlaatlas" target='_blank' aria-label="Instagram" className={buttonVariants({ size: 'icon', variant: 'outline' })}>
                                <Linkedin className="size-5" />
                            </Link>
                            <Link to="#" aria-label="Twitter" className={buttonVariants({ size: 'icon', variant: 'outline' })}>
                                <Pinterest className="size-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-primary-foreground/20 my-8" />

                {/* Copyright Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs opacity-70 gap-4">
                    <p>&copy; {new Date().getFullYear()} Sahla Atlas Export. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}