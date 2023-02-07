import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Login() {
    const {setToken} = useStateContext()
    const emailRef = useRef()
    const passwordRef = useRef()
    // error handler
    const [error, setError] = useState()
    const onsubmit = (e) => {
        e.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        setError(null)
        axiosClient.post('/login', payload)
            .then(({data}) => {
                setToken(data.token)
            })
            .catch((error) => {
                const response = error.response
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setError(response.data.errors)
                    } else {
                        setError({
                            email: [response.data.message]
                        })
                    }
                }
            })
    }
    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className="form">
                <form onSubmit={onsubmit}>
                    <h1 className='title'>
                        Login into your account
                    </h1>
                    {error &&
                        <div className='alert'>
                            {Object.keys(error).map((keys) => (
                                <p key={keys}>{error[keys][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={emailRef} type="email" placeholder='Email'/>
                    <input ref={passwordRef} type="password" placeholder='Password'/>
                    <button className='btn btn-block'>Login</button>
                    <p className='message'>
                        Not Registered ? <Link to="/signup">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
