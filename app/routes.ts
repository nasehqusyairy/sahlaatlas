import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('routes/layouts/default.tsx', [
        index("routes/home.tsx"),
        route('/about', 'routes/about.tsx')
    ]),
    layout('routes/layouts/admin.tsx', [
        route('/admin','routes/dashboard.tsx')
    ])
] satisfies RouteConfig;
