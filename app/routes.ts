import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('routes/layouts/default.tsx', [
        index("routes/home.tsx"),
        route('about', 'routes/about.tsx')
    ]),
    route('admin','routes/layouts/admin.tsx', [
        route('','routes/admin/dashboard.tsx'),
        route('articles','routes/admin/articles/index.tsx')
    ]),
    route('/login','routes/login.tsx')
] satisfies RouteConfig;
