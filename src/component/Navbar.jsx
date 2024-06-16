import React from 'react'
import { BiTask } from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../service/apiUtils/authAPIs'

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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
                <button
                    onClick={() => navigate("/dashboard")}
                >
                    Dashboard
                </button>            
                <button
                    onClick={() => logout(dispatch, navigate)}
                >
                    Logout
                </button>            
            </div>
        ): (
            <div className='flex gap-2'>
                <button
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
                <button
                    onClick={() => navigate("/signup")}
                >
                    Signup
                </button>
            </div>
        )}
    </div>
  )
}

export default Navbar