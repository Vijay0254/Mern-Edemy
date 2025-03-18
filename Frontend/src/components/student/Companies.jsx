import React from 'react'
import company1Img from '../../assets/microsoft_logo.svg'
import company2Img from '../../assets/walmart_logo.svg'
import company3Img from '../../assets/accenture_logo.svg'
import company4Img from '../../assets/adobe_logo.svg'
import company5Img from '../../assets/paypal_logo.svg'

const Companies = () => {
  return (
    <section className='pt-16'>
        <h1 className='text-gray-500'>Trusted by learners from</h1>
        <div className='flex flex-wrap justify-center items-center gap-6 md:gap-16 md:mt-10 mt-5'>
          <img src={company1Img} alt="microsoft_logo" className='w-20 md:w-28' />
          <img src={company2Img} alt="walmart_logo" className='w-20 md:w-28' />
          <img src={company3Img} alt="accenture_logo" className='w-20 md:w-28' />
          <img src={company4Img} alt="adobe_logo" className='w-20 md:w-28' />
          <img src={company5Img} alt="paypal_logo" className='w-20 md:w-28' />
        </div>
    </section>
  )
}

export default Companies