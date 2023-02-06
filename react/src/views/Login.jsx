import {Link} from "react-router-dom";

export default function Login() {
    const onsubmit = (e)=> {
        e.preventDefault()
    }
    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className="form">
                <form onSubmit={onsubmit}>
                    <input type="email" placeholder='Email'/>
                    <input type="password" placeholder='Password'/>
                    <button className='btn btn-block'>Login</button>
                    <p className='message'>
                        Not Registered ? <Link rel="stylesheet" href="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
