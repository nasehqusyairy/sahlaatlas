import React, { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Card } from "~/components/ui/card"
import { X } from "lucide-react"

type MenuItem = {
    title: string
    description: string
    image: string
}

const arr: MenuItem[] = [
    {
        title: 'Partnership Session 1',
        description: 'Direct meeting and sample handover with international partners to discuss quality standards and trade agreements.',
        image: '/images/gallery1.jpeg'
    },
    {
        title: 'Partnership Session 2',
        description: 'Formal discussion and agreement exchange between local representatives inside our facility meeting space.',
        image: '/images/gallery2.jpeg'
    },
    {
        title: 'Farmer Collaboration',
        description: 'Gathering with local agricultural producers and community leaders to evaluate harvest output and processing methods.',
        image: '/images/gallery3.jpeg'
    },
    {
        title: 'Processing Facility 1',
        description: 'Overview of our automated sorting and drying infrastructure used for maintaining uniform commodity standards.',
        image: '/images/gallery4.jpeg'
    },
    {
        title: 'Processing Facility 2',
        description: 'Detailed view of the sorting conveyor belt system optimizing production workflow and cleaning stages.',
        image: '/images/gallery5.jpeg'
    },
    {
        title: 'Warehouse Storage',
        description: 'Internal warehouse staging area showcasing bulk commodity preparation and distribution readiness.',
        image: '/images/gallery6.jpeg'
    },
    {
        title: 'Inventory Management',
        description: 'Organized stacks of packaged commodities awaiting final quality inspection before global export.',
        image: '/images/gallery7.jpeg'
    },
    {
        title: 'Drying Line System',
        description: 'High-capacity drying technology applied to reduce moisture and preserve rich aromatic profiles.',
        image: '/images/gallery8.jpeg'
    },
    {
        title: 'Quality Control Hub',
        description: 'Final grading and packaging zone where products undergo strict evaluation prior to dispatch.',
        image: '/images/gallery9.jpeg'
    }
]

type MenuCardProps = {
    item: MenuItem
    onSelect: (item: MenuItem) => void
}

function MenuCard({ item, onSelect }: MenuCardProps) {
    return (
        <div
            onClick={() => onSelect(item)}
            className="group cursor-pointer flex flex-col w-full overflow-hidden"
        >
            <Card className="relative w-full pt-0 rounded-none border-none shadow-none bg-transparent overflow-hidden">
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                    <img
                        loading="lazy"
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 z-20 w-full h-full object-cover group-hover:scale-105 transition-all duration-500 rounded-none"
                    />
                    
                    <div className="absolute inset-0 z-30 bg-black/0 group-hover:bg-black/50 transition-all duration-300 pointer-events-none" />

                    <div className="absolute inset-0 z-40 p-6 flex flex-col justify-end items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <h3 className="text-white font-bold text-lg lg:text-xl text-left drop-shadow-md mb-1">
                            {item.title}
                        </h3>
                        <p className="text-white/90 text-xs lg:text-sm text-left leading-relaxed drop-shadow-md line-clamp-3">
                            {item.description}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export function MenuSection() {
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

    return (
        <section id="gallery" className="py-8 bg-primary">
            <div className="container mx-auto p-4 max-w-6xl">
                <div className="mx-auto mb-12 text-primary-foreground flex flex-col items-center text-center max-w-2xl">
                    <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-3 block">
                        OUR GALLERY
                    </span>
                    <h2 className="text-2xl lg:text-4xl font-bold">Solving the problems that move the business</h2>
                    <p className="mt-2 text-primary-foreground/80">Explore our curated professional offerings</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {arr.map((item, index) => (
                        <MenuCard key={index} item={item} onSelect={setSelectedItem} />
                    ))}
                </div>

                <AnimatePresence>
                    {selectedItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
                            onClick={() => setSelectedItem(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative max-w-4xl w-full bg-transparent p-0 rounded-none overflow-visible shadow-none flex items-center justify-center"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute -top-10 right-0 z-50 p-2 bg-black/50 text-white hover:bg-black transition-colors rounded-none"
                                    aria-label="Close modal"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="w-full flex items-center justify-center overflow-hidden max-h-[85vh]">
                                    <img
                                        src={selectedItem.image}
                                        alt={selectedItem.title}
                                        className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-none shadow-2xl"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}