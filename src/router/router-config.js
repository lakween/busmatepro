import {useRoutes} from "react-router-dom";
import Login from "../components/common/login-page/login-page";
import Sidebar from "../components/common/sidebar/sidebar.component";
import Home from "../components/passenger/pages/home-page/home.page";
import SignUp from "../components/passenger/pages/sign-up/sign-up.page";
import RequestHistory from "../components/passenger/pages/request-history/request-history";
import RatingsFeedback from "../components/passenger/pages/ratings and feedback/ratings&feedback";
import Profile from "../components/common/profile/profile";
import useUserLoginInfo from "../hooks/useLoginInfor";
import DriverHomePage from "../components/driver/pages/home-page/home-page";
import MessagePage from "../components/driver/pages/message/message-page";
import SidebarV2 from "../components/common/sidebar/sideBarV2.component";
import React from "react";

export let RouterConfig = () => {
    let userDetails = useUserLoginInfo()

    let passengerRoutes = [
        {
            path: "/user",
            element:  <SidebarV2/>,
            children: [
                {index: true, element: <Home/>},
                {path: "history", element: <RequestHistory/>},
                {path: "ratings&feedback", element: <RatingsFeedback/>},
                {path: "profile", element: <Profile/>},
                {path:"message",element: <MessagePage/>}
            ],
        }]

    let driverRoute = [
        {
            path: "/user",
            element: <SidebarV2/>,
            children: [
                {index: true, element: <DriverHomePage/>},
                {path: "messages", element: <MessagePage/>},
                {path: "history", element: <RequestHistory/>},
                {path: "ratings&feedback", element: <RatingsFeedback/>},
                {path: "profile", element: <Profile/>},
            ],
        }
    ]

    function getRoutesByType() {
        switch (userDetails?.type) {
            case 'passenger': {
                return passengerRoutes
            }
            case  'driver': {
                return driverRoute
            }
            default : {
                return []
            }
        }
    }

    let routes = [
        {
            path: "/",
            element: <Login/>,
        },

        {
            path: "signup",
            element: <SignUp/>,
        },
        ...getRoutesByType()
    ];

    let element = useRoutes(routes);
    return element
}