import type { LoaderFunctionArgs } from 'react-router';
import routesConfig from '../../routes';
import { SEO_CONFIG } from '~/models/seo';
import { getAllProductSlugs } from '~/.server/services/article';
import { createClient } from '~/.server/supabase';

export async function loader({ request }: LoaderFunctionArgs) {
    const { supabase } = createClient(request);

    function extractPaths(routes: any[], parentPath = ''): string[] {
        let paths: string[] = [];

        for (const route of routes) {
            let currentPath = parentPath;

            if (route.path) {
                currentPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/');
            }

            // Lewati parameter dinamis (:slug) dan catch-all (*)
            if (
                currentPath &&
                !currentPath.includes(':') &&
                !currentPath.includes('*')
            ) {
                paths.push(currentPath);
            }

            if (route.children && Array.isArray(route.children)) {
                paths = paths.concat(extractPaths(route.children, currentPath));
            }
        }

        return paths;
    }

    // 2. Ambil rute statis dari routes.ts
    const rawPaths = extractPaths(routesConfig);

    // 3. Ambil daftar slug artikel produk dari database
    const productSlugs = await getAllProductSlugs(supabase);
    const dynamicProductPaths = productSlugs.map((slug) => `/products/${slug}`);

    // 4. Gabungkan rute statis + rute dinamis
    const allPaths = [...rawPaths, ...dynamicProductPaths];

    // 5. Filter rute yang dikecualikan (/admin, dll.)
    const publicPaths = Array.from(new Set(allPaths)).filter((path) => {
        return !SEO_CONFIG.excludedPrefixes.some((prefix) => path.startsWith(prefix));
    });

    // 6. Rakit string XML
    const content = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Halaman Utama / Root -->
  <url>
    <loc>${SEO_CONFIG.domain}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
  <!-- Seluruh Rute Statis & Dinamis -->
  ${publicPaths
            .map(
                (path) => `
    <url>
      <loc>${SEO_CONFIG.domain}${path.startsWith('/') ? path : `/${path}`}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <priority>${path.startsWith('/products/') ? '0.9' : '0.8'}</priority>
    </url>`
            )
            .join('')}
</urlset>`;

    return new Response(content, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        },
    });
}