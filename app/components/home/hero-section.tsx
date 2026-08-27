"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { motion, type Variants } from "motion/react";

export function HeroSection() {
    // Hook sederhana untuk mendeteksi layar besar (lg >= 1024px)
    const [isLg, setIsLg] = useState(false);

    useEffect(() => {
        const checkLg = () => setIsLg(window.innerWidth >= 1024);
        checkLg();
        window.addEventListener("resize", checkLg);
        return () => window.removeEventListener("resize", checkLg);
    }, []);

    // Variant untuk ketiga span (gerakan linear dari kiri)
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

    // Variant untuk tombol "See all" (gerakan linear dari kanan)
    const buttonVariants: Variants = {
        hidden: { x: "100%" },
        visible: {
            x: "0%",
            transition: {
                duration: 1,
                delay: 0.15, // Selaras dengan animasi gambar
                ease: "linear",
            },
        },
    };

    return (
        <section id="home">
            <div className="h-80 lg:h-[75vh] relative overflow-hidden flex items-end bg-muted">
                {/* Background Gambar dengan Clip Path Responsive (5% mobile, 20% desktop) */}
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

                {/* Tombol See All di Pojok Kanan Atas dengan Desain Mirip Span & Transisi dari Kanan */}
                <motion.div
                    className="absolute top-2 right-0 z-20 overflow-hidden"
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={buttonVariants}>
                        <Button
                            variant="ghost"
                            className="bg-muted lg:text-xl font-bold py-4 size-auto"
                            size={'lg'}
                        >
                            See all
                            <ArrowRight className="size-8 p-2 bg-primary text-primary-foreground" />
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Mask Bingkai Kiri Teks */}
                <div className="relative z-10 overflow-hidden">
                    <motion.h1
                        className="flex flex-col items-start"
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.span
                            variants={spanVariants}
                            className="inline-block text-2xl lg:text-7xl uppercase font-bold py-2 lg:py-4 px-4 lg:pl-60 lg:pr-12 bg-muted"
                        >
                            Rooted
                        </motion.span>

                        <motion.span
                            variants={spanVariants}
                            className="inline-block text-2xl lg:text-7xl uppercase font-bold py-2 lg:py-4 px-4 lg:pl-60 lg:pr-12 bg-muted"
                        >
                            In Indonesia,
                        </motion.span>

                        <motion.span
                            variants={spanVariants}
                            className="inline-block text-2xl lg:text-7xl uppercase font-bold py-2 lg:py-4 px-4 lg:pl-60 lg:pr-12 bg-muted"
                        >
                            Trusted Worldwide
                        </motion.span>
                    </motion.h1>
                </div>
            </div>
        </section>
    );
}