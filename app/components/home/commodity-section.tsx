import { motion } from "motion/react";
import { Button } from "../ui/button";

export function CommoditySection() {
    const commodities = [
        {
            title: "Indonesian Coffee",
            description:
                "Authentic origin coffee grown in rich volcanic soil with distinct regional flavor profiles (Sumatra, Java, Bali, Sulawesi, Nusa Tenggara). Strictly quality-controlled for roasters, wholesalers, and global distributors.",
            image: "/images/coffee.jpg",
            alt: "Premium Coffee Beans Harvest",
        },
        {
            title: "Indonesian Cocoa",
            description:
                "Carefully selected beans grown in fertile lands (Kalimantan, Sumatra, Java, Sulawesi, Nusa Tenggara) delivering rich flavor, smooth texture, deep aroma, and consistent quality. Ideal for chocolate manufacturers and food industries.",
            image: "/images/cocoa.jpg",
            alt: "Tea Highland Harvest",
        },
        {
            title: "Indonesian Tea",
            description:
                "Cultivated in highland plantations with volcanic soil and high altitude. Offers natural freshness, distinctive aroma, and superior character across regions like Sumatra, Java, Bali, Sulawesi, and Nusa Tenggara.",
            image: "/images/tea.jpg",
            alt: "Indonesian Commodity Farmers",
        },
    ];

    return (
        <section id="about" className="py-16 lg:py-24">
            <div className="container mx-auto px-4">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-3 block">
                        OUR COMMODITIES
                    </span>
                    <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
                        Quality Products from Indonesia
                    </h2>
                </div>

                <div className="space-y-20 lg:space-y-32">
                    {commodities.map((item, index) => {
                        const isEven = index % 2 === 1;

                        return (
                            <motion.div
                                key={index}
                                className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } }
                                }}
                            >
                                <motion.div
                                    variants={{ hidden: { opacity: 0, x: isEven ? 30 : -30 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
                                    className={`flex flex-col items-start ${isEven ? "lg:order-2" : "lg:order-1"}`}
                                >
                                    <span className="flex items-center justify-center w-12 h-12 bg-secondary text-secondary-foreground font-bold text-xl mb-6">
                                        0{index + 1}
                                    </span>

                                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                                        {item.title}
                                    </h3>

                                    <p className="text-muted-foreground leading-relaxed text-base lg:text-lg mb-6">
                                        {item.description}
                                    </p>

                                    <Button variant="outline" size="lg" className="w-full lg:w-auto">
                                        See More
                                    </Button>
                                </motion.div>

                                <motion.div
                                    variants={{ hidden: { opacity: 0, x: isEven ? -30 : 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.5 } } }}
                                    className={`relative w-full h-[350px] sm:h-[420px] overflow-hidden ${isEven ? "lg:order-1" : "lg:order-2"}`}
                                >
                                    <img
                                        loading="lazy"
                                        src={item.image}
                                        alt={item.alt}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}