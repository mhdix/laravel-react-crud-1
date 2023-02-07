import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import axiosClient from "../axios-client.js";

export default function SignUp() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()

    const {setUser, setToken} = useStateContext()
    const [error, setError] = useState();
    const onsubmit = (e) => {
        e.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        axiosClient.post('/signup', payload)
            .then(({data}) => {
                setToken(data.token)
                setUser(data.user)
            }).catch((error) => {
            const response = error.response
            if (response && response.status === 422) {
                setError(response.data.errors)
            }
        })
    }
    return (
        <div className='login-signup-form animated fadeInDown'>

            <div className="form">

                <form onSubmit={onsubmit}>
                    <h1 className='title'>
                        Signup for free
                    </h1>
                    {error &&
                        <div className='alert'>
                            {Object.keys(error).map((keys) => (
                                <p>{error[keys][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} type="name" placeholder='Full Name'/>
                    <input ref={emailRef} type="email" placeholder='Email'/>
                    <input ref={passwordRef} type="password" placeholder='Password'/>
                    <input ref={passwordConfirmationRef} type="password" placeholder='Password Confirmation'/>
                    <button className='btn btn-block'>Login</button>
                    <p className='message'>
                        Already Registered? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}
