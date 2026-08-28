import { Button } from "../ui/button";

export function AboutSection() {
    return (
        <section id="about" className="py-12">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    <div className="relative w-full max-w-md mx-auto lg:max-w-none pb-14">
                        {/* Gambar 1 (Utama / Belakang - Dibuat Potret) */}
                        {/* Menggunakan aspect-[3/4] dan menghapus fixed height agar mengikuti rasio potret */}
                        <div className="w-4/5 aspect-3/4 mx-auto relative z-0">
                            <img
                                src="/images/farmer2.jpg"
                                alt="Indonesian Commodity Farmers"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Gambar 2 (Pojok Kanan Bawah - Memotong Gambar Utama dari Depan Bawah) */}
                        <div className="absolute bottom-0 right-0 w-3/5 h-55 sm:h-70 z-20 border-8 border-muted">
                            <img
                                src="/images/farmer1.jpg"
                                alt="Premium Coffee Beans Harvest"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Konten Teks */}
                    <div className="flex flex-col items-start">

                        <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                            Bridging Indonesian Agriculture to World Markets
                        </h2>

                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            PT Sahla Atlas Export is a trusted Indonesian export company specializing in high-quality agricultural commodities. We directly supply premium coffee, cocoa, and tea sourced from dedicated farmers across Indonesia's fertile highlands.
                        </p>

                        <p className="text-muted-foreground mb-8 leading-relaxed">
                            Driven by quality, sustainability, and long-term partnerships, we ensure that every commodity meets strict international standards to support coffee roasters, food industries, and global distributors worldwide.
                        </p>

                        <Button variant="outline" size="lg" className={'w-full lg:w-auto'}>
                            See More
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}