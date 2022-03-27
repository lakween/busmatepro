import { RouteObject } from "react-router-dom";
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import Login from "../components/common/login-page/login-page";
import App from "../App";

export let RouterConfig = ()=>{

    let routes = [
        {
            path: "/",
            element: <App />,
        },
        // {
        //     path: "/",
        //     element: <Layout />,
        //     children: [
        //         { index: true, element: <Home /> },
        //         {
        //             path: "/courses",
        //             element: <Courses />,
        //             children: [
        //                 { index: true, element: <CoursesIndex /> },
        //                 { path: "/courses/:id", element: <Course /> },
        //             ],
        //         },
        //         { path: "*", element: <NoMatch /> },
        //     ],
        // },
    ];

    let element = useRoutes(routes);
    return element
}