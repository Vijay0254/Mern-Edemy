import React from 'react'
import logoImg from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { useEducatorStore } from '../../store/useEducatorStore'

const Navbar = () => {

  //Creak Auth
  const { openSignIn } = useClerk()
  const { user } = useUser()

  const { isEducator } = useEducatorStore()

  return (
    <nav className='flex items-center bg-cyan-100/70 justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4'>
      <Link to={'/'}>
        <img src={logoImg} alt="logoImg" className='w-20 lg:w-32 cursor-pointer' />
      </Link>

      <div className='sm:text-sm text-xs lg:text-base flex items-center gap-2 sm:gap-5 text-gray-500'>
        {user &&
          <div className='flex items-center gap-1 sm:gap-x-3'>
            <Link to={`/educator`} className='cursor-pointer'>{isEducator ? "Educator Dashboard" : "Become Educator"}</Link>
            |
            <Link to={'/my-enrollments'}>My Enrollments</Link>
          </div>
        }

        {user ? <UserButton /> : <button onClick={() =>openSignIn()} className='bg-blue-600 cursor-pointer rounded-full px-5 py-2 text-white'>Create Account</button>}
      </div>
    </nav>
  )
}

export default Navbar