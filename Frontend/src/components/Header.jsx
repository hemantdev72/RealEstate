import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const {currentUser}=useSelector(state=>state.user);

  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <NavLink to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Sahand</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </NavLink>
            <form className='bg-slate-100 p-2 rounded-lg flex items-center'>
                <input type="text" placeholder='Search...' className='text-md bg-transparent focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-slate-600' />
            </form>
            <ul className='flex justify-between items-center gap-4'>
                <li className='hidden sm:inline text-slate-700 hover:underline'><NavLink to="/" className={({isActive})=> isActive?'text-blue-700' : 'text-black'}>Home</NavLink></li>
                <li className='hidden sm:inline text-slate-700 hover:underline'><NavLink to="/about" className={({isActive})=> isActive?'text-blue-700' : 'text-black'}>About</NavLink></li>
                <li className='hidden sm:inline text-slate-700 hover:underline'><NavLink to="/sign-in" className={({isActive})=> isActive?'text-blue-700' : 'text-black'}>Sign In</NavLink></li>
            </ul>
        </div>
    </header>
  )
}

export default Header