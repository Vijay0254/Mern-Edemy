import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCourseStore } from '../../store/useCourseStore.js'
import CourseCard from './CourseCard'
import Loading from '../Loading.jsx'

const CourseSection = () => {

  const { fetchCourses, isFetchingCourses, courses } = useCourseStore()

  const navigate = useNavigate()

  useEffect(() =>{
    fetchCourses(navigate)
  }, [])

  return (
    <section className='py-16 md:px-40 px-8'>
        <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
        <p className='text-sm md:text-base text-gray-500 mt-3'>Discover our top-rated courses across various categories. From coding and design to business and wellness, our courses are crafted to deliver results.</p>

        {!isFetchingCourses ?
          <div className='grid grid-auto px-4 md:px-0 md:my-16 my-10 gap-4'>
            {courses?.slice(0, 4)?.map((element) =>(
              <CourseCard key={element._id} course={element} />
            ))}
          </div> :
          <Loading />
        }

        <Link to={'/course-list'} className='text-gray-500 border border-gray-500/30 px-10 inline-block py-3 rounded'>Show all courses</Link>
    </section>
  )
}

export default CourseSection