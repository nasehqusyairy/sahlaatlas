import { Button } from "../ui/button";
import { CommodityIllustration } from "./commodity-illustration";

export function CommoditySection() {
    const commodities = [
        {
            title: "Indonesian Cocoa",
            description:
                "Carefully selected beans grown in fertile lands (Kalimantan, Sumatra, Java, Sulawesi, Nusa Tenggara) delivering rich flavor, smooth texture, deep aroma, and consistent quality. Ideal for chocolate manufacturers and food industries.",
        },
        {
            title: "Indonesian Tea",
            description:
                "Cultivated in highland plantations with volcanic soil and high altitude. Offers natural freshness, distinctive aroma, and superior character across regions like Sumatra, Java, Bali, Sulawesi, and Nusa Tenggara.",
        },
        {
            title: "Indonesian Coffee",
            description:
                "Authentic origin coffee grown in rich volcanic soil with distinct regional flavor profiles (Sumatra, Java, Bali, Sulawesi, Nusa Tenggara). Strictly quality-controlled for roasters, wholesalers, and global distributors.",
        },
    ];

    return (
        <section id="about" className="py-12">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Konten Teks */}
                    <div className="flex flex-col items-start">

                        <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                            Our Commodities
                        </h2>

                        {/* Custom Ordered List */}
                        <ol className="space-y-6 mb-8 w-full">
                            {commodities.map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    {/* Angka dengan ukuran lebih besar & background secondary */}
                                    <span className="flex items-center justify-center min-w-10 h-10 bg-secondary text-secondary-foreground font-bold text-lg shrink-0">
                                        {index + 1}
                                    </span>

                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                                            {item.description}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ol>

                        <Button variant="outline" size="lg">
                            See More
                        </Button>
                    </div>

                    <CommodityIllustration />

                </div>
            </div>
        </section>
    );
}