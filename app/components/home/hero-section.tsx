"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { motion, type Variants } from "motion/react";

export function HeroSection() {
    // Variant untuk ketiga span (gerakan linear, bergerak bersamaan dari luar layar kiri)
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
            <div className="h-80 relative overflow-hidden flex items-end bg-muted">
                {/* Background Gambar dari picsum.photos dengan animasi Clip Path */}
                <motion.img
                    src="https://placehold.co/600x400"
                    alt="Hero Background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    initial={{ clipPath: "inset(0 0 0 100%)" }}
                    animate={{ clipPath: "inset(0 0 0 5%)" }}
                    transition={{
                        duration: 0.8,
                        delay: 0.15, // Gambar muncul sedikit lebih lambat dari teks
                        ease: "linear",
                    }}
                />

                {/* Mask Bingkai Kiri: overflow-hidden memastikan teks tidak terlihat di luar batas h1 */}
                <div className="relative z-10 overflow-hidden">
                    <motion.h1
                        className="flex flex-col items-start"
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.span
                            variants={spanVariants}
                            className="inline-block text-2xl py-2 px-4 bg-muted"
                        >
                            Amet
                        </motion.span>

                        <motion.span
                            variants={spanVariants}
                            className="inline-block text-2xl py-2 px-4 bg-muted"
                        >
                            Dolor Sit
                        </motion.span>

                        <motion.span
                            variants={spanVariants}
                            className="text-2xl py-2 px-4 bg-muted flex items-center gap-2"
                        >
                            Lorem Ipsum
                            <Button variant="ghost" className="gap-2 underline">
                                See all <ArrowRight className="size-4 p-0.5 bg-primary text-primary-foreground" />
                            </Button>
                        </motion.span>
                    </motion.h1>
                </div>
            </div>
        </section>
    );
}