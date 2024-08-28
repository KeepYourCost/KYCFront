import * as React from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import './index.css'

import 'react-toastify/dist/ReactToastify.css';
import Notifications from "./pages/notification";
import LoginPage from "./pages/login";
import InstancesList from "./pages/instance-list";
import InstanceDetail from "./pages/instance-detail";
import CreateInstance from "./pages/create-instance";
import InstancePricingMonitoringPage from "./pages/monitoring";
import SettingsPage from "./pages/setting";
import {ToastContainer} from "react-toastify";


const router = createBrowserRouter([
    {
        path: "/notifications",
        element: (
            <Notifications></Notifications>
        ),
    },
    {
        path: "/login",
        element: (
            <LoginPage></LoginPage>
        ),
    },
    {
        path: "/",
        element: (
            <InstancesList></InstancesList>
        ),
    },
    {
        path: "/instance",
        element: (
            <InstancesList></InstancesList>
        ),
    },
    {
        path: "/instance/:id",
        element: (
            <InstanceDetail></InstanceDetail>
        ),
    },
    {
        path: "/create-instance/",
        element: (
            <CreateInstance></CreateInstance>
        ),
    },
    {
        path: "/monitoring/",
        element: (
            <InstancePricingMonitoringPage></InstancePricingMonitoringPage>
        ),
    },
    {
        path: "/setting/",
        element: (
            <SettingsPage></SettingsPage>
        ),
    }
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router}>
        <ToastContainer />
    </RouterProvider>
);