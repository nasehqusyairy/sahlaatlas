import { SiFacebook, SiInstagram, SiX, SiYoutube } from '@icons-pack/react-simple-icons';

export function PageFooter() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-12">
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand & Logo */}
                    <div className="space-y-4 md:col-span-1">
                        <img
                            src="https://placehold.co/100"
                            alt="Coffee Exporter Logo"
                            className="h-12"
                        />
                        <p className="text-sm opacity-80 leading-relaxed">
                            Premium green coffee bean exporter supplying high-grade Arabica and Robusta to roasters and distributors worldwide.
                        </p>
                    </div>

                    {/* Quick Links Column 1 */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><a href="#" className="hover:opacity-100 hover:underline transition-all">Home</a></li>
                            <li><a href="#products" className="hover:opacity-100 hover:underline transition-all">Our Coffee Beans</a></li>
                            <li><a href="#about" className="hover:opacity-100 hover:underline transition-all">About Us</a></li>
                            <li><a href="#export-process" className="hover:opacity-100 hover:underline transition-all">Export Process</a></li>
                        </ul>
                    </div>

                    {/* Quick Links Column 2 */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Trade & Support</h3>
                        <ul className="space-y-2 text-sm opacity-80">
                            <li><a href="#" className="hover:opacity-100 hover:underline transition-all">Request Samples</a></li>
                            <li><a href="#" className="hover:opacity-100 hover:underline transition-all">Quality & Certifications</a></li>
                            <li><a href="#" className="hover:opacity-100 hover:underline transition-all">Shipping & Freight</a></li>
                            <li><a href="#" className="hover:opacity-100 hover:underline transition-all">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                        <p className="text-sm opacity-80 mb-4">
                            Stay updated with our latest harvest, market trends, and global shipments:
                        </p>
                        <div className="flex gap-4">
                            <a href="#" aria-label="Facebook" className="p-2 rounded-full border border-current opacity-80 hover:opacity-100 transition-opacity">
                                <SiFacebook className="size-5" />
                            </a>
                            <a href="#" aria-label="Instagram" className="p-2 rounded-full border border-current opacity-80 hover:opacity-100 transition-opacity">
                                <SiInstagram className="size-5" />
                            </a>
                            <a href="#" aria-label="Twitter" className="p-2 rounded-full border border-current opacity-80 hover:opacity-100 transition-opacity">
                                <SiX className="size-5" />
                            </a>
                            <a href="#" aria-label="Youtube" className="p-2 rounded-full border border-current opacity-80 hover:opacity-100 transition-opacity">
                                <SiYoutube className="size-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-primary-foreground/20 my-8" />

                {/* Copyright Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs opacity-70 gap-4">
                    <p>&copy; {new Date().getFullYear()} Global Coffee Export Co. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Trade</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}