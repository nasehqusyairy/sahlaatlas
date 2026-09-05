import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('routes/layouts/default.tsx', [
        index("routes/home.tsx"),
        route('about', 'routes/about.tsx'),
        route('blogs', 'routes/blogs.tsx'),
        route('blogs/:slug', 'routes/blog-detail.tsx'),
        route('tags', 'routes/tags.tsx'),
    ]),
    route('admin', 'routes/layouts/admin.tsx', [
        route('', 'routes/admin/dashboard.tsx'),

        route('articles', 'routes/admin/articles.tsx'),
        route('articles/draft', 'routes/admin/articles-draft.tsx'),
        route('articles/archived', 'routes/admin/articles-archived.tsx'),

        route('products', 'routes/admin/products.tsx'),
        route('products/archived', 'routes/admin/products-archived.tsx'),
    ]),
    route('/login', 'routes/login.tsx')
] satisfies RouteConfig;
