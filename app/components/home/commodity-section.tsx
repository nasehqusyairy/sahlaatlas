import React from "react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

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
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{ show: { transition: { staggerChildren: 0.18 } } }}
                >

                    {/* Images: placed first in DOM but visually ordered to the right on lg */}
                    <motion.div variants={{}} className="relative w-full max-w-md mx-auto lg:max-w-none pt-10 pr-6 pb-14 pl-6 lg:order-2">
                        <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}>
                            <motion.div variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="absolute top-0 left-0 w-2/5 h-40 sm:h-50 z-10 border-8 border-muted">
                                <img loading="lazy"
                                    src="/images/cocoa.jpg"
                                    alt="Tea Highland Harvest"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            <motion.div variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="w-4/5 h-80 sm:h-105 mx-auto relative z-0">
                                <img loading="lazy"
                                    src="/images/coffee.jpg"
                                    alt="Indonesian Commodity Farmers"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>

                            <motion.div variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="absolute bottom-0 right-0 w-3/5 h-55 sm:h-70 z-20 border-8 border-muted">
                                <img loading="lazy"
                                    src="/images/tea.jpg"
                                    alt="Premium Coffee Beans Harvest"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Konten Teks */}
                    <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }} className="flex flex-col items-start">

                        <motion.h2 variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }} className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                            Our Commodities
                        </motion.h2>

                        {/* Custom Ordered List */}
                        <ol className="space-y-6 mb-8 w-full">
                            {commodities.map((item, index) => (
                                <motion.li key={index} variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }} className="flex items-start gap-4">
                                    {/* Angka dengan ukuran lebih besar & background secondary */}
                                    <span className="flex items-center justify-center min-w-10 h-10 bg-secondary text-secondary-foreground font-bold text-lg shrink-0">
                                        {index + 1}
                                    </span>

                                    <div>
                                        <h3 className="text-xl font-semibold text-foreground mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed text-sm lg:text-base mb-4">
                                            {item.description}
                                        </p>
                                        <Button variant="outline" size="lg" className={'w-full lg:w-auto'}>
                                            See More
                                        </Button>
                                    </div>
                                </motion.li>
                            ))}
                        </ol>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}