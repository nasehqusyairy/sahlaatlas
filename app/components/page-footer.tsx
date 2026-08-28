import { SiFacebook, SiInstagram, SiX, SiYoutube } from '@icons-pack/react-simple-icons';
import { buttonVariants } from './ui/button';

export function PageFooter() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-12">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand & Logo */}
                    <div className="space-y-4 md:col-span-1">
                        <img
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
                        <h3 className="font-semibold text-lg mb-4"> Links</h3>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><a href="#" className="hover:opacity-100 hover:underline transition-all">Home</a></li>
                            <li><a href="#products" className="hover:opacity-100 hover:underline transition-all">Our Coffee Beans</a></li>
                            <li><a href="#about" className="hover:opacity-100 hover:underline transition-all">About Us</a></li>
                            <li><a href="#export-process" className="hover:opacity-100 hover:underline transition-all">Export Process</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                        <p className="text-sm opacity-80 mb-4">
                            Stay updated with our latest harvest, market trends, and global shipments:
                        </p>
                        <div className="flex gap-4">
                            <a href="#" aria-label="Facebook" className={buttonVariants({ size: 'icon', variant: 'outline' })}>
                                <SiFacebook className="size-5" />
                            </a>
                            <a href="#" aria-label="Instagram" className={buttonVariants({ size: 'icon', variant: 'outline' })}>
                                <SiInstagram className="size-5" />
                            </a>
                            <a href="#" aria-label="Twitter" className={buttonVariants({ size: 'icon', variant: 'outline' })}>
                                <SiX className="size-5" />
                            </a>
                            <a href="#" aria-label="Youtube" className={buttonVariants({ size: 'icon', variant: 'outline' })}>
                                <SiYoutube className="size-5" />
                            </a>
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