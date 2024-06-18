import React, { useState } from 'react'
import { login } from '../../service/apiUtils/authAPIs'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData;

    const handleChangeForm = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password, dispatch, navigate);
    }

  return (
    <div>
        <form
            onSubmit={handleSubmit}
            className='w-full'
        >
            <div>
                <label
                    htmlFor='email'
                    className='text-xs'
                >
                    Email
                </label>
                <input
                    required
                    id='email'
                    type='text'
                    name='email'
                    value={email}
                    onChange={handleChangeForm}
                    placeholder='Enter email'
                    // className='w-full'
                />
            </div>
            <div>
                <label
                    htmlFor='password'
                    className='text-xs'
                >
                    Password
                </label>
                <input
                    required
                    id='password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChangeForm}
                    placeholder='Enter Passowrd'
                    // className='w-full'
                />
            </div>
            <button
                type='submit'
                className='border-2'
            >
                Login
            </button>
        </form>
    </div>
  )
}

export default Login