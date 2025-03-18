import React from 'react'
import { useUser, UserButton } from '@clerk/clerk-react'
import { dummyEducatorData } from '../../utils/data'
import logoImg from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
import profileImg from '../../assets/profile_img.png'

const Navbar = () => {

  const { user } = useUser()

  return (
    <nav className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <Link to={'/'}>
        <img className='w-28 lg:w-32' src={logoImg} alt="logo" />
      </Link>
      <div className='flex items-center gap-5 text-gray-500 relative'>
        <p>Hi! {user ? user.fullName : "Developer"}</p>
        {user ? <UserButton /> : <img className='max-w-8' src={profileImg} alt='profileImg' />}
      </div>
    </nav>
  )
}

export default Navbar