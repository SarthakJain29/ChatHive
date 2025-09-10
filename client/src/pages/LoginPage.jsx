import React, { use, useState } from 'react'
import assets from '../assets/assets'

const LoginPage = () => {

  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSUbmitted, setIsDataSubmitted] = useState(false);

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/*   left side   */}
      <img src={assets.logo_big} alt="" className='w-40 sm:w-48 md:w-56 max-w-[200px] h-auto object-contain'/>

      {/*   right side  */}
      <form className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          <img src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
        </h2>

        {currState === "Sign up" && !isDataSUbmitted && (
          <input onChange={(e) => setFullName(e.target.value)} value={fullName} 
          type="text" className='p-2 border border-gray-500 rounded-md focus:outline-none'  placeholder='Full Name' required/>
        )}

        {!isDataSUbmitted && (
          <>
          {/* email and password */}
          <input onChange={(e) => setemail(e.target.value)} value={email}
          type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
          <input onChange={(e) => setPassword(e.target.value)} value={password}
          type="password" placeholder='Password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' />
          </>
        )}

        {/*  bio field  */}
        {
          currState === "Sign up" && isDataSUbmitted && (
            <textarea onChange={(e) => setBio(e.target.value)} value={bio}
            rows={4} className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='write a short bio...'></textarea>
          )
        } 
        <button type="submit" className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>
        
        <div className='flex items-center gap-2 text-sm text-gray-500'>
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy</p>
        </div>

        <div className='flex flex-col gap-2'>
          {currState === "Sign up" ? (
            <p className='text-sm text-gray-600'>
              Already have an account? <span className='font-medium text-violet-500 cursor-pointer'>Login here</span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>
              Create an account <span className='font-medium text-violet-500 cursor-pointer'>Click here</span>
            </p>
          )}
        </div>

      </form> 
    </div>
  )
}

export default LoginPage