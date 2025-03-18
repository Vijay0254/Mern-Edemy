import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CourseSection from '../../components/student/CourseSection'
import Testimonial from '../../components/student/Testimonial'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'

const Home = () => {
  return (
    <main className='flex flex-col gap-y-7 items-center text-center'>
      <Hero />
      <Companies />
      <CourseSection />
      <Testimonial />
      <CallToAction />
      <Footer />
    </main>
  )
}

export default Home