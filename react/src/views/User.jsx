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
                <h1>کاربران</h1>
                <Link to="/user/new" className='btn-add '>اضافه کردن</Link>
            </div>
            <div className='card animated fadeInDown'>
                {!error ? loading === false ?
                    <table className='animated fadeInDown'>
                        <thead style={{textAlign: 'center', alignItems: 'center'}}>
                        <tr>
                            <td>عملیات</td>
                            <td>زمان ساخت</td>
                            <td>ایمیل</td>
                            <td>نام</td>
                            <td>آیدی</td>
                        </tr>
                        </thead>
                        <tbody style={{textAlign: 'center', alignItems: 'center'}}>
                        {users && users?.map(user => (
                            <tr key={user.id}>
                                <td>
                                    <button className='btn-delete' style={{marginRight: '5px'}}>حذف</button>
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
                    : <h1 className='text-center animated fadeInDown'>...درحال دریافت اطلاعات از سرور</h1>:<div className='alert alert-danger text-center' role='alert'>{error}</div>}
            </div>
        </div>
    );
}
