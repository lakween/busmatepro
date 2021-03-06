import {RouteObject} from "react-router-dom";
import {Outlet, Link, useRoutes, useParams} from "react-router-dom";
import Login from "../components/common/login-page/login-page";
import App from "../App";
import Sidebar from "../components/common/sidebar/sidebar.component";
import Home from "../components/passenger/pages/home-page/home.page";
import SignUp from "../components/passenger/pages/sign-up/sign-up.page";
import RequestHistory from "../components/passenger/pages/request-history/request-history";

export let RouterConfig = () => {

    let routes = [
        {
            path: "/",
            element: <Login/>,
        },
        {
            path: "passenger",
            element: <Sidebar/>,
            children: [
                {index: true, element: <Home/>},
                {path: "history", element: <RequestHistory/>},
            ],
        },
        {
            path: "signup",
            element: <SignUp/>,
        },
    ];

    let element = useRoutes(routes);
    return element
}