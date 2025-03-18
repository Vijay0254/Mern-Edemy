import React from 'react'

const Loading = () => {
  return (
    <div className='flex mt-5 flex-row-reverse sm:mt-24 items-center gap-x-3 sm:gap-x-7 justify-center'>
        <span className='loading loading-bars loading-sm sm:loading-xl text-neutral'></span>
        <span className='text-neutral font-prata font-bold text-center text-2xl sm:text-5xl'>Loading</span> 
    </div>
  )
}

export default Loading