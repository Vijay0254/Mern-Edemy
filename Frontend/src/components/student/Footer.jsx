import React from 'react'
import logoImg from '../../assets/logo_dark.svg'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white/80 md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full'>
          <img src={logoImg} alt="logoImg" />
          <p className='mt-6 text-center md:text-left text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.</p>
        </div>

        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold mb-5'>Company</h2>
          <ul className='flex md:flex-col w-full md:gap-y-2 text-sm justify-between'>
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>

        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold mb-5'>Subscrive to our newsletter</h2>
          <p className='text-sm'>The latest news, articles, and resources, sent to your inbox weekly.</p>
        
          <div className='flex items-center gap-2 pt-4'>
            <input className='border border-gray-500/80 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm' type="email" name="email" id="email" placeholder='Enter your email' />
            <button className='bg-blue-600 cursor-pointer w-24 h-9 rounded'>Subscribe</button>
          </div>
        </div>
      </div>

      <p className='text-center py-4 text-xs md:text-sm'>Copyright 2025 © Edemy. All Right Reserved.</p>
    </footer>
  )
}

export default Footer