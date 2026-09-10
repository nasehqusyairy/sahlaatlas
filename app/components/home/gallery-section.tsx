import React, { useState } from "react"
import { motion, AnimatePresence, type Variants } from "motion/react"
import { X, Maximize2 } from "lucide-react"
import type { Photo } from "~/models/photo"
import { Badge } from "~/components/ui/badge"

function getBentoSpanClass(index: number) {
    const patternIndex = index % 6

    switch (patternIndex) {
        case 0:
            return "md:col-span-2 md:row-span-2 h-[340px] md:h-[480px]"
        case 1:
            return "md:col-span-1 md:row-span-1 h-[220px] md:h-[232px]"
        case 2:
            return "md:col-span-1 md:row-span-1 h-[220px] md:h-[232px]"
        case 3:
            return "md:col-span-2 md:row-span-1 h-[220px] md:h-[232px]"
        case 4:
            return "md:col-span-1 md:row-span-2 h-[340px] md:h-[480px]"
        case 5:
            return "md:col-span-1 md:row-span-1 h-[220px] md:h-[232px]"
        default:
            return "md:col-span-1 md:row-span-1 h-[220px] md:h-[232px]"
    }
}

// Variants untuk kontainer utama (staggering)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12, // Jeda antar item sedikit diperluas agar efek terurut lebih terasa
        },
    },
}

// Variants untuk setiap item bento
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.215, 0.61, 0.355, 1], // Smooth cubic-bezier
        },
    },
}

type GalleryCardProps = {
    item: Photo
    index: number
    onSelect: (item: Photo) => void
}

function BentoGalleryCard({ item, index, onSelect }: GalleryCardProps) {
    const spanClass = getBentoSpanClass(index)

    return (
        <motion.div
            variants={itemVariants}
            onClick={() => onSelect(item)}
            className={`group relative overflow-hidden bg-primary-foreground/5 border border-primary-foreground/15 shadow-lg cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-primary-foreground/40 ${spanClass}`}
        >
            {/* Background Image */}
            <img
                loading="lazy"
                src={item.src}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Overlay Gelap */}
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 " />

            {/* Icon Maximize saat Hover */}
            <div className="absolute top-3 right-3 p-2 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
                <Maximize2 className="w-4 h-4" />
            </div>

            {/* Konten Teks */}
            <div className="absolute inset-0 p-5 flex flex-col justify-end text-white z-10 pointer-events-none opacity-0 group-hover:opacity-100">
                <Badge variant="secondary" className="mb-2">
                    {new Date(item.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </Badge>
                <h3 className="font-bold text-base md:text-lg lg:text-xl text-white leading-tight drop-shadow-md line-clamp-1 group-hover:line-clamp-2 transition-all">
                    {item.title}
                </h3>
                <p className="text-white/80 text-xs mt-1 leading-relaxed line-clamp-2 transition-all duration-300 drop-shadow-sm">
                    {item.description}
                </p>
            </div>
        </motion.div>
    )
}

export function GallerySection(props: {
    items: Photo[]
    // aos?: boolean
}) {
    const [selectedItem, setSelectedItem] = useState<Photo | null>(null)

    return (
        <section id="gallery" className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-12 text-center max-w-2xl"
                >
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
                        Gallery
                    </h2>
                </motion.div>

                {/* Bento Grid Dinamis */}
                {props.items.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        // amount: 0.45 menuntut minimal 45% area elemen terlihat di layar sebelum animasi terpicu
                        viewport={{
                            once: true,
                            // amount: aos ? 0.45 : undefined
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-none"
                    >
                        {props.items.map((item, index) => (
                            <BentoGalleryCard
                                key={item.id ?? index}
                                item={item}
                                index={index}
                                onSelect={setSelectedItem}
                            />
                        ))}
                    </motion.div>
                ) : (
                    <div className="text-center py-20 text-primary-foreground/60 border border-dashed border-primary-foreground/20">
                        Belum ada item galeri yang tersedia.
                    </div>
                )}

                {/* Modal Lightbox */}
                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
                            onClick={() => setSelectedItem(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                                className="relative max-w-5xl w-full bg-primary text-primary-foreground border border-primary-foreground/20 overflow-hidden shadow-2xl flex flex-col md:flex-row"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-4 right-4 z-50 p-2 bg-black/60 text-white hover:bg-black/90 transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <div className="w-full md:w-2/3 bg-black flex items-center justify-center p-4">
                                    <img
                                        src={selectedItem.src}
                                        alt={selectedItem.title}
                                        className="w-auto h-auto max-w-full max-h-[75vh] object-contain"
                                    />
                                </div>

                                <div className="w-full md:w-1/3 p-6 sm:p-8 flex flex-col justify-center bg-primary border-t md:border-t-0 md:border-l border-primary-foreground/10">
                                    <Badge variant="secondary" className="mb-2">
                                        {new Date(selectedItem.created_at).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </Badge>
                                    <h3 className="text-2xl font-bold mb-3">{selectedItem.title}</h3>
                                    <p className="text-primary-foreground/80 text-sm leading-relaxed">
                                        {selectedItem.description}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}