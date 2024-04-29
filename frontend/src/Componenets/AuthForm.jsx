import React, { useState ,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'
const AuthForm = ({ onSubmit }) => {
    const nav = useNavigate()
    useEffect(()=>{ 
    if(localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null){
            nav('/home')
        }

    },[])
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isRegister, setIsRegister] = useState(false);

  const toggleForm = () => {
    setIsRegister(!isRegister);
};

const submitForm = async (data) => {
    onSubmit(data, isRegister);
    if(isRegister){
        try {
            
            const res = await axios.post('http://localhost:4000/register',data)
            console.log(res) 
            toast.success(res.data.message)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message,{theme:'dark'})
            
        }
    }else{
        try {
            
            const res = await axios.post('http://localhost:4000/login',data)
            toast.success("Login Successful",{theme:'dark'})
            console.log(res)
            localStorage.setItem('token',res.data.token)
            if(res.data.token){

                nav('/home')
            }
        } catch (error) {
            console.log(error)
            toast.error('Check Crdentials',{theme:'dark'})
            
        }


    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="  bg-gray-800 bg-opacity-75 shadow-inner shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-4 text-white">{isRegister ? 'Sign Up' : 'Login'}</h3>

      {/* Username Field */}
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          {...register('username', { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
        />
        {errors.username && <p className="text-red-500 text-xs italic">Username is required</p>}
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          {...register('password', { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="********"
        />
        {errors.password && <p className="text-red-500 text-xs italic">Password is required</p>}
      </div>

      {/* For Register Form: Email Field */}
      {isRegister && (
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            {...register('email', { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="example@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs italic">Email is required</p>}
        </div>
      )}

      {/* Toggle Button */}
      <div className="mb-4">
        <button
          onClick={toggleForm}
          className="text-sm text-blue-200 hover:text-blue-400"
          type="button"
        >
          {isRegister ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          {isRegister ? 'Sign Up' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
