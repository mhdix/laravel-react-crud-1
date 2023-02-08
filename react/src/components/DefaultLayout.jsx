import {Link, Navigate, Outlet, useNavigate} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
    const {token, user, setUser, setToken} = useStateContext();

    if (!token) {
        return <Navigate to='/login'/>
    }
    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout').then(()=>{
            setToken(null)
            setUser({})
        })
    }
    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data)
        })
    }, [])

    return (
        <div id='defaultLayout'>
            <aside>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/user'>User</Link>
            </aside>
            <div className='content'>
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {user?.name}
                        <a href="#" onClick={onLogout} className='btn-logout'>Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
            </div>

        </div>
    )
}
