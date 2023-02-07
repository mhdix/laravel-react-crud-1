import {Link} from "react-router-dom";
import {useRef} from "react";

export default function SignUp() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const onsubmit = (e)=> {
        e.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        console.log(payload)
    }
    return (
        <div className='login-signup-form animated fadeInDown'>
            <div className="form">
                <form onSubmit={onsubmit}>
                    <h1 className='title'>
                        Signup for free
                    </h1>
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
