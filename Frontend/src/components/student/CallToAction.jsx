import React from 'react'
import arrowImg from '../../assets/arrow_icon.svg'

const CallToAction = () => {
  return (
    <section className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-32'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn anything, anytime, anywhere</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea.</p>
    
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='bg-blue-600 text-white px-10 py-3 rounded-md'>Get Started</button>
        <button className='flex items-center gap-x-2'>Learn more <img src={arrowImg} alt="arrowImg" /></button>
      </div>
    </section>
  )
}

export default CallToAction