import React from 'react'
import { BiTask } from "react-icons/bi"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    
  return (
    <div className='w-full flex justify-evenly'>
        <div className='flex justify-center items-center'>
            <BiTask/>
            <p>
                Rehaabit Task App
            </p>
        </div>
        <div className='flex gap-2'>
            <Link to={"/"}>
                <p>Home</p>
            </Link>

            <Link to={"/contact"}>
                <p>Contact</p>
            </Link>

            <Link>
                <p>About Us</p>
            </Link>
        </div>
        {token ? (
            <div className='flex gap-2'>
                <button>Dashboard</button>            
                <button>logout</button>            
            </div>
        ): (
            <div className='flex gap-2'>
                <button>Login</button>
                <button>Signup</button>
            </div>
        )}
    </div>
  )
}

export default Navbar