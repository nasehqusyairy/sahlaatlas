export function CommodityIllustration() {
    return (
        <div className="relative w-full max-w-md mx-auto lg:max-w-none pt-10 pr-6 pb-14 pl-6">

            {/* Gambar 1 (Pojok Kiri Atas - Memotong Gambar Utama dari Depan Atas) */}
            <div className="absolute top-0 left-0 w-2/5 h-40 sm:h-50 z-10 border-8 border-muted">
                <img loading="lazy"
                    src="/images/cocoa.jpg"
                    alt="Tea Highland Harvest"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Gambar 2 (Utama / Belakang - Landasan Gambar Lain) */}
            <div className="w-4/5 h-80 sm:h-105 mx-auto relative z-0">
                <img loading="lazy"
                    src="/images/coffee.jpg"
                    alt="Indonesian Commodity Farmers"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Gambar 3 (Pojok Kanan Bawah - Memotong Gambar Utama dari Depan Bawah) */}
            <div className="absolute bottom-0 right-0 w-3/5 h-55 sm:h-70 z-20 border-8 border-muted">
                <img loading="lazy"
                    src="/images/tea.jpg"
                    alt="Premium Coffee Beans Harvest"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}