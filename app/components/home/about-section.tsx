import { motion } from "motion/react";
import { Button } from "../ui/button";

export function AboutSection() {
    // Sequential animations via motion/react variants and staggerChildren
    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.25 } },
    };

    const item = {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, easing: "ease-out" } },
    };

    return (
        <section id="about" className="py-12">
            <div className="container mx-auto px-4">
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                >

                    <div className="relative w-full max-w-md mx-auto lg:max-w-none pb-14">
                        {/* Gambar 1 (Utama / Belakang - Dibuat Potret) */}
                        {/* Use aspect-[3/4] and remove the fixed height to preserve the portrait ratio. */}
                        <motion.div variants={item} className="w-4/5 aspect-3/4 mx-auto relative z-0">
                            <img loading="lazy"
                                src="/images/farmer2.jpg"
                                alt="Indonesian Commodity Farmers"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Image 2 (bottom-right corner, cropping the main image from the lower foreground). */}
                        <motion.div variants={item} className="absolute bottom-0 right-0 w-3/5 h-55 sm:h-70 z-20 border-8 border-muted">
                            <img loading="lazy"
                                src="/images/farmer1.jpg"
                                alt="Premium Coffee Beans Harvest"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                    {/* Konten Teks */}
                    <div className="flex flex-col items-start">

                        <motion.h2 variants={item} className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
                            Bridging Indonesian Agriculture to World Markets
                        </motion.h2>

                        <motion.p variants={item} className="text-muted-foreground mb-4 leading-relaxed">
                            PT Sahla Atlas Export is a trusted Indonesian export company specializing in high-quality agricultural commodities. We directly supply premium coffee, cocoa, and tea sourced from dedicated farmers across Indonesia's fertile highlands.
                        </motion.p>

                        <motion.p variants={item} className="text-muted-foreground mb-8 leading-relaxed">
                            Driven by quality, sustainability, and long-term partnerships, we ensure that every commodity meets strict international standards to support coffee roasters, food industries, and global distributors worldwide.
                        </motion.p>

                        <motion.div variants={item} className={'w-full lg:w-auto'}>
                            <Button variant="outline" size="lg" className={'w-full lg:w-auto'}>
                                See More
                            </Button>
                        </motion.div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}