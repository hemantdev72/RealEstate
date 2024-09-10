import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

function SignUp() {
  const [formData,setFormData]=useState({
    username:"",
    email:"",
    password:""
  });
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);

  const navigate=useNavigate();

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      const res=await fetch("/api/auth/signup",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })

      const data=await res.json();
      console.log(data);
      if(data.success===false){
        setLoading(false);
        setError(data.message);
        return
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in")
    } catch{
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-5'>Sign Up</h1>
    <form action="" className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <input type="text" placeholder="username" id="username" name="username" className='p-3 border rounded-lg' onChange={handleChange}/>
      <input type="email" placeholder="email" id="email" name='email' className='p-3 border rounded-lg' onChange={handleChange}/>
      <input type="password" placeholder="password" id="password" name='password' className='p-3 border rounded-lg' onChange={handleChange}/>
      <button disabled={loading} className='bg-slate-700 text-white hover:opacity-95 p-3 rounded-lg uppercase disabled:opacity-80'>{loading?"loading...":"Submit"}</button>
      <OAuth />
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Have an Account?</p>
      <Link to={"/sign-in"}><span className='text-blue-700'>Sign in</span> </Link>
    </div>
  </div>  
  )
}

export default SignUp;