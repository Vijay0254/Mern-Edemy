import React from 'react'
import { dummyTestimonial } from '../../utils/data'
import starImg from '../../assets/rating_star.svg'
import starBlankImg from '../../assets/star_dull_icon.svg'

const Testimonial = () => {
  return (
    <section className='pb-14 px-8 md:px-32'>
        <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
        <p className='text-sm md:text-base text-gray-500 mt-3'>Hear from our learners as they share their journeys of transformation, success, and how our platform has made a difference in their lives.</p>

        <div className='grid grid-auto gap-8 mt-14'>
          {dummyTestimonial.map((element, index) =>(
            <div key={index} className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden'>
              <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10'>
                <img className='size-12 rounded-full' src={element.image} alt={element.name} />
                <div>
                  <h1 className='text-lg font-medium text-gray-800'>{element.name}</h1>
                  <p className='text-gray-800/80'>{element.role}</p>
                </div>
              </div>
              <div className='p-5 pb-5'>
                <div className='flex items-center gap-x-0.5'>
                  {[...Array(5)].map((_, i) =>(
                    <img key={i} src={i < Math.floor((element.rating)) ? starImg : starBlankImg} alt="starImg" className='h-5' />
                  ))}
                </div>
                <p className='text-gray-500 mt-5'>{element.feedback}</p>
              </div>
            </div>
          ))}
        </div>
    </section>
  )
}

export default Testimonial