import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../config/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import authImage from "../../assets/img/auth-img.webp";


import Swal from 'sweetalert2';

function SignIn() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const signIn = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail("");
            setPassword("");

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logged In",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate("/");
            });



        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid Credentials",
            });
        }

    }

    return (
        <section className="vh-100 auth-sec" style={{ backgroundColor: "#212529" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign In</p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="form-outline flex-fill mb-2">
                                                <input
                                                    type="email"
                                                    name='email'
                                                    placeholder='Enter Email'
                                                    className="form-control"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="form-outline flex-fill mb-2">
                                                <input
                                                    type="password"
                                                    name='password'
                                                    placeholder='Enter Password'
                                                    className="form-control"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className='d-flex flex-row align-items-center mb-4 mt-3'>
                                                <p className='text-secondary'>Don't Have Account : <Link to='/signup'>Sign Up</Link></p>
                                            </div>

                                            <div className='d-flex flex-row align-items-center mb-4 mt-3'>
                                                <p className='text-secondary'><Link to='/resetpassword'>Reset Password</Link></p>
                                            </div>


                                            <div className="auth-btn">
                                                <button onClick={signIn} type="button" className="btn btn-primary btn-lg">Sign In</button>
                                            </div>



                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src={authImage}
                                            className="img-fluid" alt="Sample" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignIn