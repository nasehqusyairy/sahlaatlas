import { Button } from "../ui/button";

export function AboutSection() {
    return (
        <section id="about" className="py-16 lg:py-24">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Visual 3 Gambar Menumpuk (Flat Style & Sharp Cut-Out) */}
                    <div className="relative w-full max-w-md mx-auto lg:max-w-none pt-10 pr-6 pb-14 pl-6">

                        {/* Gambar 1 (Pojok Kiri Atas - Memotong Gambar Utama dari Depan Atas) */}
                        <div className="absolute top-0 left-0 w-2/5 h-[160px] sm:h-[200px] z-10 border-8 border-muted">
                            <img
                                src="/images/cocoa.jpg"
                                alt="Tea Highland Harvest"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Gambar 2 (Utama / Belakang - Landasan Gambar Lain) */}
                        <div className="w-4/5 h-[320px] sm:h-[420px] mx-auto relative z-0">
                            <img
                                src="/images/coffee.jpg"
                                alt="Indonesian Commodity Farmers"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Gambar 3 (Pojok Kanan Bawah - Memotong Gambar Utama dari Depan Bawah) */}
                        <div className="absolute bottom-0 right-0 w-3/5 h-[220px] sm:h-[280px] z-20 border-8 border-muted">
                            <img
                                src="/images/tea.jpg"
                                alt="Premium Coffee Beans Harvest"
                                className="w-full h-full object-cover"
                            />
                        </div>

                    </div>

                    {/* Konten Teks */}
                    <div className="flex flex-col items-start">
                        <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                            About PT Sahla Atlas Export
                        </span>

                        <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                            Bridging Indonesian Agriculture to World Markets
                        </h2>

                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            PT Sahla Atlas Export is a trusted Indonesian export company specializing in high-quality agricultural commodities[cite: 1]. We directly supply premium coffee, cocoa, and tea sourced from dedicated farmers across Indonesia's fertile highlands[cite: 1].
                        </p>

                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            Driven by quality, sustainability, and long-term partnerships, we ensure that every commodity meets strict international standards to support coffee roasters, food industries, and global distributors worldwide[cite: 1].
                        </p>

                        <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 rounded-none border-muted">
                            Learn More About Us
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}