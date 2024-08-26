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


const router = createBrowserRouter([
    {
        path: "/notifications",
        element: (
            <Notifications></Notifications>
        ),
    }
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);