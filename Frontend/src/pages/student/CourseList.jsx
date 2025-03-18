import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SearchBar from '../../components/student/SearchBar'
import { useCourseStore } from '../../store/useCourseStore.js'
import Loading from '../../components/Loading.jsx'
import CourseCard from '../../components/student/CourseCard'
import { X } from 'lucide-react'
import Footer from '../../components/student/Footer.jsx'

const CourseList = () => {

  const navigate = useNavigate()

  const { input } = useParams()

  const { fetchCourses, isFetchingCourses, courses } = useCourseStore()

  const [filteredCourse, setfilteredCourse] = useState([])

  useEffect(() =>{
    fetchCourses(navigate)
  }, [])

  function handleFilter(){
    if(courses){
      const tempCourses = courses.slice()
      if(input){
        setfilteredCourse(tempCourses.filter((element) =>element.courseTitle.toUpperCase().includes(input.toUpperCase())))
      }
      else{
        setfilteredCourse(tempCourses)
      }
    }
  }

  useEffect(() =>{
    handleFilter()
  }, [courses, input])

  return (
    <>
      <div className='relative sm:px-14 lg:px-40 px-8 pt-20 text-left'>
        <div className='flex md:flex-row flex-col w-full gap-6 items-start md:items-center justify-between'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>
            <p className='text-gray-500'><span onClick={() =>navigate('/')} className='text-blue-600 cursor-pointer'>Home</span> / <span>Course List</span></p>
          </div>
          <SearchBar data={input} />
        </div>

        {input && 
          <div className='inline-flex items-center gap-4 px-4 py-2 border border-slate-300 mt-8 -mb-8 text-gray-600'>
            <p>{input}</p>
            <X onClick={() =>navigate("/course-list")} className='cursor-pointer' />
          </div>
        }

        {!isFetchingCourses ?
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-5 px-2 md:p-0'>
            {filteredCourse?.map((element) =>(
              <CourseCard key={element._id} course={element} />
            ))}
          </div> :
          <Loading />
        }
      </div>

      <Footer />
    </>
  )
}

export default CourseList