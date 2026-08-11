import { type RouteObject } from "react-router-dom";
import Layout from "./layouts/layout";



const Routes: RouteObject[] = [
    {
        element: <Layout />, children: [
            { path: '/', element: <div>dashboard</div> }
        ]
    },
    { path: "login", element: <div>log in</div> }
]

export default Routes