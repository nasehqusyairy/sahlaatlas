import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";

export function HeroSection() {
    // Simple hook for detecting large screens (lg >= 1024px).
    const [isLg, setIsLg] = useState(false);

    useEffect(() => {
        const checkLg = () => setIsLg(window.innerWidth >= 1024);
        checkLg();
        window.addEventListener("resize", checkLg);
        return () => window.removeEventListener("resize", checkLg);
    }, []);

    // Variant for the three spans (linear motion from the left).
    const spanVariants: Variants = {
        hidden: { x: "-100%" },
        visible: {
            x: "0%",
            transition: {
                duration: 1,
                ease: "linear",
            },
        },
    };

    return (
        <section id="home">
            <div className="h-80 lg:h-[75vh] relative overflow-hidden flex items-end container mx-auto">
                {/* Image background with a responsive clip path (5% mobile, 20% desktop). */}
                <motion.img
                    src="/images/hero.jpg"
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    initial={{ clipPath: "inset(0 0 0 100%)" }}
                    animate={{
                        clipPath: isLg ? "inset(0 0 0 20%)" : "inset(0 0 0 5%)",
                    }}
                    transition={{
                        duration: 1,
                        delay: 0.15,
                        ease: "linear",
                    }}
                />

                {/* Mask Bingkai Kiri Teks */}
                <div className="relative z-10 overflow-hidden">
                    <motion.h1
                        className="flex flex-col items-start font-heading"
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.span
                            variants={spanVariants}
                            className="inline-block text-2xl lg:text-7xl uppercase font-bold py-2 lg:py-4 px-4 lg:pr-12 bg-background"
                        >
                            Rooted
                        </motion.span>

                        <motion.span
                            variants={spanVariants}
                            className="inline-block text-2xl lg:text-7xl uppercase font-bold py-2 lg:py-4 px-4 lg:pr-12 bg-background"
                        >
                            In Indonesia,
                        </motion.span>

                        <motion.span
                            variants={spanVariants}
                            className="inline-block text-2xl lg:text-7xl uppercase font-bold py-2 lg:py-4 px-4 lg:pr-12 bg-background"
                        >
                            Trusted Worldwide
                        </motion.span>
                    </motion.h1>
                    <motion.p
                        variants={spanVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-block text-lg text-muted-foreground py-2 lg:py-4 px-4 lg:pr-12 bg-background"
                    >
                        Quality agricultural commodities from Indonesia, sourced with care and delivered to international markets
                    </motion.p>
                </div>
            </div>
        </section>
    );
}