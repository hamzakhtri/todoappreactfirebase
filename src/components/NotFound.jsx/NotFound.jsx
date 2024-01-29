import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className='w-full vh-100 bg-dark text-white text-center d-flex align-items-center justify-content-center'>
            <div>
                <h1>Invalid Path</h1>
                <Link to="/" className="btn btn-primary btn-lg px-4 me-md-2 mt-4">Go To Home</Link>
            </div>
        </div>
    )
}

export default NotFound