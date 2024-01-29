import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../../config/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import authImage from "../../assets/img/auth-img.webp";
import Swal from 'sweetalert2';

function SignUp() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = async () => {
        try {
            let userCredential = await createUserWithEmailAndPassword(auth, email, password);
            let user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {userID : user.uid, username, email, password});
            setUsername("");
            setEmail("");
            setPassword("");
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Account Created",
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                navigate("/");
              });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message.split(":")[1],
            });
        }

    }


    return (
        <>

            <section className="vh-100 auth-sec" style={{ backgroundColor: "#212529" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4">

                                                <div className="form-outline flex-fill mb-2">
                                                    <input
                                                        type="text"
                                                        name='username'
                                                        placeholder='Enter Name'
                                                        className="form-control"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        required
                                                    />
                                                </div>

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
                                                        placeholder='Create Password'
                                                        className="form-control"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className='d-flex flex-row align-items-center mb-4 mt-3'>
                                                    <p className='text-secondary'>Allready Have Account : <Link to='/signin'>Sign In</Link></p>
                                                </div>


                                                <div className="auth-btn">
                                                    <button type="button" onClick={register} className="btn btn-primary btn-lg">Register</button>
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

        </>
    )
}

export default SignUp