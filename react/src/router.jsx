import {createBrowserRouter} from "react-router-dom";
import Login from "./views/Login.jsx";
import SignUp from "./views/SignUp";
import User from "./views/User";
import NotFound from "./views/NotFound";
import GuestLayout from "./components/GuestLayout";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./views/Dashboard";


const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/signup',
                element: <SignUp/>,
            },
        ]
    },
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/user',
                element: <User/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
        ]
    },

    {
        path: '*',
        element: <NotFound/>
    },
]);

export default router;
