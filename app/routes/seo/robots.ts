import type { LoaderFunctionArgs } from "react-router";
import { SEO_CONFIG } from "~/models/seo";

export async function loader({ request }: LoaderFunctionArgs) {
    // Generate baris Disallow berdasarkan array excludedPrefixes
    const disallowRules = SEO_CONFIG.excludedPrefixes
        .map((prefix) => `Disallow: ${prefix}`)
        .join("\n");

    const content = `User-agent: *
Allow: /

${disallowRules}

Sitemap: ${SEO_CONFIG.domain}/sitemap.xml
`;

    return new Response(content, {
        status: 200,
        headers: {
            "Content-Type": "text/plain",
            "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
    });
}