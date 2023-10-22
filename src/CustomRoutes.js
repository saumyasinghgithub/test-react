import Layout from './layouts';
import Page from './pages';

const CustomRoutes = [
    {
        path: "/products",
        secure: false,
        exact: true,
        layout: Layout.DefaultLayout,
        component: Page.Products,
    },
    {
        path: "/readls",
        secure: false,
        exact: true,
        layout: Layout.DefaultLayout,
        component: Page.ReadLocalStorage,
    },
    {
        path: "/:page",
        secure: false,
        exact: true,
        layout: Layout.DefaultLayout,
        component: Page.Home,
    },
    {
        path: "/",
        secure: false,
        exact: true,
        layout: Layout.LoginLayout,
        component: Page.HomePage,
    },
    {
        path: "*",
        secure: false,
        exact: true,
        layout: Layout.DefaultLayout,
        component: Page.Home,
    },
];
export default CustomRoutes;