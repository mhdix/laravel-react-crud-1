import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";

export default function User() {
    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    useEffect(() => {
        getUser()
    }, [])

    const getUser = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({data}) => {
                setUsers(data.data);
                setLoading(false)
                setError('')
            })
            .catch(() => {
                setLoading(false)
                setError('اتصال شما به پایگاه داده برقرار نشده است')
            })
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <h1>Users</h1>
                <Link to="/user/new" className='btn-add '>Add new</Link>
            </div>
            <div className='card animated fadeInDown'>
                <table>
                    <thead style={{textAlign: 'center' , alignItems:'center'}}>
                    <tr >
                        <td>عملیات</td>
                        <td>زمان ساخت</td>
                        <td>ایمیل</td>
                        <td>نام</td>
                        <td>آیدی</td>
                    </tr>
                    </thead>
                    <tbody style={{textAlign: 'center' , alignItems:'center'}}>
                    {users && users?.map(user => (
                        <tr key={user.id}>
                            <td>
                                <button className='btn-delete'>حذف</button>
                                <Link to={`/user/${user.id}`} className='btn-edit'>ویرایش</Link>
                            </td>
                            <td>{user.created_at}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.id}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
