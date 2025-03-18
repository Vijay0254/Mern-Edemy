import React from 'react'
import sketchImg from '../../assets/sktech.svg'
import SearchBar from '../../components/student/SearchBar'

const Hero = () => {
  return (
    <section className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 gap-y-7 bg-gradient-to-b from-cyan-100/70'>
      <h1 className='sm:text-5xl text-center text-3xl relative font-bold text-gray-800 max-w-3xl mxauto'>Empower your future with the courses designed to <span className='text-blue-600'>fit your choice.</span><img src={sketchImg} alt="sketchImg" className='sm:block hidden absolute -bottom-7 right-0' /></h1>
      <p className='text-sm hidden md:block text-center text-gray-500 max-w-2xl mx-auto'>We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.</p>
      <p className='md:hidden block text-center text-gray-500 max-w-2xl mx-auto'>We bring together world-class instructors to help you achieve your professional goals.</p>

      <SearchBar />
    </section>
  )
}

export default Hero