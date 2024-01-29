import React, { useState } from 'react'
import { auth } from '../../config/config'
import {  sendPasswordResetEmail } from 'firebase/auth';
import authImage from "../../assets/img/auth-img.webp";
import Swal from 'sweetalert2';

function ResetPassword() {

    const [userEmail, setUserEmail] = useState("");

    const resetPassword = () => {
        const actionCodeSettings = {
            // URL to redirect the user after password reset
            url: 'https://todoappreactfirebase-76f5a.web.app/signin',
            handleCodeInApp: false,
        };
    
        sendPasswordResetEmail(auth, userEmail, actionCodeSettings)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Link Sent",
                    text: "Check Your Email To Reset Password",
                })
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Something Went Wrong",
                    text: errorMessage,
                });
            });
    }

    return (
        <section className="vh-100 auth-sec bg-dark">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Reset Password</p>

                                        <form className="mx-1 mx-md-4">

                                            <div className="form-outline flex-fill mb-2">
                                                <input
                                                    type="email"
                                                    name='email'
                                                    placeholder='Enter Email'
                                                    className="form-control p-3"
                                                    value={userEmail}
                                                    onChange={(e) => setUserEmail(e.target.value)}
                                                    required
                                                />
                                            </div>


                                            <div className="mb-3 mb-lg-4 auth-btn">
                                                <button onClick={resetPassword} type="button" className="btn btn-primary btn-lg w-100 mt-3">Confirm Email</button>
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

export default ResetPassword