import { Outlet, type RouteObject } from "react-router-dom";



const Routes: RouteObject[] = [
    {
        element: <div>layout <Outlet /></div>, children: [
            { path: '/', element: <div>dashboard</div> }
        ]
    },
    { path: "login", element: <div>log in</div> }
]

export default Routes