import React, { useEffect, useState } from 'react'
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../Toast/index';
import { registerUser } from '../../Services/api';


const SingnUp = () => {

  const [data,setData] = useState('')
  const [userId,setUserId] = useState('')

  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const handleChange =(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{

      const response = await registerUser(data);
      console.log('User registered: ',response);
      if (response.success) {
        successToast('Registration Successfull')
        navigate('/login')
      }
      
    }catch(err){
      // console.log(err);
      errorToast(err && err.response && err.response.data.message)
    }

  };

//   useEffect(() => {
//     try{
//       if (token) {
//         navigate('/userslist')
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   })



  return (
    <div>
      
      <div className='signup w-4/5 sm:w-3/5 md:w-3/6 lg:w-1/3 m-auto mt-3 p-2 sm:p-5 text-center text-white'>
        <h1 className='text-4xl mb-10'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='text-center'>
            <input className='w-4/5' type="text" name='fname' placeholder='Enter your firstname...' onChange={handleChange} /><br />
            <input className='w-4/5' type="text" name='lname' placeholder='Enter your lastname...' onChange={handleChange}/><br />
            <input className='w-4/5' type="text" name='username' placeholder='Enter your username...' onChange={handleChange}/><br />
            <input className='w-4/5' type="password" name='password' placeholder='Enter your password...' onChange={handleChange}/><br />
            <input className='w-4/5' type="password" name='confirmpassword' placeholder='Confirm password...' onChange={handleChange}/><br />
            <input className='signup1-btn w-3/6 sm:w-2/6 mt-5 mb-5' type="submit" value="Sign Up" />
        </form>
        <p>Don't have an account?  
          <Link to='/login'><span className='ms-1 cursor-pointer'>Sign In</span></Link>
        </p>
      </div>

    </div>
  )
}

export default SingnUp
