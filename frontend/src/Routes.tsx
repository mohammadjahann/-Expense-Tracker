import { type RouteObject } from "react-router-dom";
import Layout from "./layouts/layout";
import LoginPage from "./features/auth/pages/LoginPage";



const Routes: RouteObject[] = [
    {
        element: <Layout />, children: [
            { path: '/', element: <div>dashboard</div> }
        ]
    },
    { path: "/login", element: <LoginPage /> }
]

export default Routes