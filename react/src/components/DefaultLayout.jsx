import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout(){
    const {token , user , setUser} = useStateContext();



    if (!token){
        return <Navigate to='/login'/>
    }
    useEffect(()=>{
        axiosClient.get('/user').then(({data})=>{
            setUser(data)
        })
    },[])
    const onLogout = (e) => {
        e.preventDefault();
    }
    return(
    <div id='defaultLayout'>
        <aside>
            <Link to='/dashboard' >Dashboard</Link>
            <Link to='/user' >User</Link>
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
