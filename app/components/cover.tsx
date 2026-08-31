import { Badge } from "~/components/ui/badge"

export type CoverProps = {
    title: string
    imageSrc?: string
    badges?: string[]
    meta?: {
        author: string
        date: string
    }
}

export function Cover({ title, meta, badges = [], imageSrc = "/images/hero.jpg" }: CoverProps) {
    return (
        <section className="w-full">
            <div className="container mx-auto">
                <div className="relative h-80 lg:h-[75vh] w-full overflow-hidden">
                    {/* Background Gambar Parallax dengan Pure CSS */}
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
                        style={{ backgroundImage: `url(${imageSrc})` }}
                    />

                    {/* Overlay Dark Gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Konten Teks di Tengah */}
                    <div className="absolute inset-0 p-6 md:p-8 text-white flex flex-col justify-center items-center text-center space-y-4 max-w-4xl mx-auto">
                        {badges.length > 0 && (
                            <div className="flex flex-wrap justify-center gap-2">
                                {badges.map((el, i) => (
                                    <Badge variant="secondary" key={`${el}-${i}`}>
                                        {el}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        <h1 className="text-2xl md:text-5xl font-bold tracking-tight line-clamp-3">
                            {title}
                        </h1>

                        {meta && (
                            <div className="flex items-center justify-center gap-3 text-sm text-gray-200">
                                <span className="font-semibold text-white">{meta.author}</span>
                                <span>•</span>
                                <time dateTime={meta.date}>{meta.date}</time>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}