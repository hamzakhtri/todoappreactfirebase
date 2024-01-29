import React from 'react'
import spinner from "../../assets/img/spinner.gif"

function Loader() {
  return (
    <div className='w-full vh-100 bg-dark d-flex justify-content-center align-items-center'>
        <img src={spinner} alt="spinner" width="150px" />
    </div>
  )
}

export default Loader