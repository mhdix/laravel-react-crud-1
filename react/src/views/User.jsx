import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";

export default function User() {
    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getUser()
    }, [])

    const getUser = () => {
        setLoading(true)
        axiosClient.get('/user')
            .then(({data}) => {
                setUsers(data);
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            Users
            {<p>{!loading ? users?.name : <p>loading ...</p>}</p>}
        </div>
    )
}
