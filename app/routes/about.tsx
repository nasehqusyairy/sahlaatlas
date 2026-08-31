import { useEffect, useState } from "react";
import mammoth from "mammoth";
import { Cover } from "~/components/cover";

export default function About() {
    const [htmlContent, setHtmlContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchAndConvertDocx() {
            try {
                // 1. Ambil file about.docx dari folder public
                const response = await fetch("/mamoth_html_test_article.docx");
                if (!response.ok) {
                    throw new Error("File about.docx tidak ditemukan di public/");
                }

                const arrayBuffer = await response.arrayBuffer();

                // 2. Konversi ArrayBuffer dari .docx menjadi HTML
                const result = await mammoth.convertToHtml(
                    { arrayBuffer },
                    {
                        // Opsi konversi gambar inline ke format Base64
                        convertImage: mammoth.images.imgElement((element) => {
                            return element.read("base64").then((imageBuffer) => ({
                                src: `data:${element.contentType};base64,${imageBuffer}`,
                            }));
                        }),
                    }
                );

                setHtmlContent(result.value);
            } catch (error) {
                console.error("Gagal mengonversi file DOCX:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAndConvertDocx();
    }, []);

    return (
        <>
            <Cover title="About Us" />

            <section className="container mx-auto px-4 lg:px-0 py-12">
                {isLoading && (
                    <div className="flex justify-center py-12">
                        <p className="text-gray-500 animate-pulse">Memuat konten...</p>
                    </div>
                )}

                {isError && (
                    <div className="p-4 rounded-lg bg-red-50 text-red-600 text-center">
                        Gagal memuat artikel. Pastikan file <code className="font-mono bg-red-100 px-1 py-0.5 rounded">public/about.docx</code> sudah tersedia.
                    </div>
                )}

                {!isLoading && !isError && (
                    <article
                        className="docx-content"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                )}
            </section>
        </>
    );
}