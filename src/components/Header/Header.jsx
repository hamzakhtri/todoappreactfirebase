import React, { } from 'react'
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'
import useUser from '../../context/UserContext'
import { signOut } from "firebase/auth";
import { auth, } from '../../config/config';
import Swal from 'sweetalert2';

function Header() {

    const navigate = useNavigate();
    const { currentUser, setCurrentUser, setUserTodos, setIsPreloader } = useUser();
    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null);
        setUserTodos([]);
        setIsPreloader(false);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Logged Out",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
            navigate("/");
        });
    }


    return (
        <>

            <header className='w-100 bg-dark text-white'>
                <div className="container col-xxl-8 px-4 py-3">
                    <div className="row align-items-center  g-5 py-3 justify-content-center">
                        <div className="col-lg-7">
                            <div className="row align-items-center">
                                <div className='col-lg-4'>
                                    <img src="https://cdn-icons-png.freepik.com/512/8019/8019118.png" width="200px" alt="todo" className='img-fluid' />
                                </div>
                                <div className='col-lg-8'>
                                    <h2 className="display-5 fw-bold lh-1 m-0">Lot's of Work todo</h2>
                                    <p className="lead m-0">Lets Create a Todo List.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-sm-8 col-lg-5">
                            <div className="d-grid gap-2 d-md-flex justify-content-center">
                                {

                                    currentUser ?
                                        <div className='text-center user-sec'>
                                            <div className="dropdown dropend">
                                                <button className="btn btn-primary fs-5 dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {currentUser.username}
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                                    <li><Link to="resetpassword" className="dropdown-item active">Reset Password</Link></li>
                                                    <li><Link onClick={logout} className="dropdown-item active">Logout</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                        :
                                        <div className='header-btn'>
                                            <Link to="/signup" className="btn btn-primary btn-lg px-4 me-lg-3 me-sm-0 mx-sm-2">SING UP</Link>
                                            <Link to="/signin" className="btn btn-outline-danger btn-lg px-4 mx-sm-2">SIGN IN</Link>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header