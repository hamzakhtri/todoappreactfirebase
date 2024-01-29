import React from 'react'
import spinner from "../../assets/img/spinner.gif"

function Preloader() {
  return (
    <div className='w- vh-100 d-flex justify-content-center align-items-center'>
        <img src={spinner} alt="spinner" className='img-fluid' width={150} />
    </div>
  )
}

export default Preloader