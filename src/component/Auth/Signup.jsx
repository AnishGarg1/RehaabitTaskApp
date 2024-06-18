import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FaRegCheckCircle } from "react-icons/fa";
import { signup } from '../../service/apiUtils/authAPIs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [isPassMatch, setIsPassMatch] = useState(false);

  const { username, firstName, lastName, email, password, confirmPassword } = formData;

  const handleChangeForm = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!isPassMatch){
      toast.error("Password do not match");
      return;
    }
    await signup(
      username,
      firstName,
      lastName,
      email,
      password,
      navigate,
    );
  }

  useEffect(() => {
    if(password!=="" && confirmPassword !== "" && password === confirmPassword){
      setIsPassMatch(true);
    }
    else{
      setIsPassMatch(false);
    }
  }, [password, confirmPassword])

  return (
    <div>
      <div>Create Your Account</div>
      <form
        className='border-2'
        onSubmit={handleSubmit}
      >
          <label>
            <p>Username</p>
            <input
              required
              type='text'
              name='username'
              value={username}
              className='border-2'
              placeholder='Enter username'
              onChange={handleChangeForm}
            />
          </label>

          <div>
            <label>
              <p>First Name</p>
              <input
                required
                type='text'
                name='firstName'
                value={firstName}
                className='border-2'
                placeholder='Enter first name'
                onChange={handleChangeForm}
              />
            </label>
            
            <label>
              <p>Last Name</p>
              <input
                required
                type='text'
                name='lastName'
                value={lastName}
                className='border-2'
                placeholder='Enter last name'
                onChange={handleChangeForm}
              />
            </label>
          </div>

          <label>
            <p>Email</p>
            <input
              required
              type='email'
              name='email'
              value={email}
              className='border-2'
              placeholder='Enter email'
              onChange={handleChangeForm}
            />
          </label>
          
          <div>
            <label>
              <p>Password</p>
              <input
                required
                type='password'
                name='password'
                value={password}
                className='border-2'
                placeholder='Enter password'
                onChange={handleChangeForm}
              />
            </label>

            <label>
              <p>Confrim Password</p>
              <input
                required
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                className='border-2'
                placeholder='Enter confirm password'
                onChange={handleChangeForm}
              />
            </label>

            <div>
              {isPassMatch && (
                <span>
                  <FaRegCheckCircle className='text-green-500'/>
                </span>
              )}
            </div>
          </div>
          <div>
            <button
            type='submit'
              className='border-2'
            >
              Signup
            </button>
          </div>
      </form>
    </div>
  )
}

export default Signup