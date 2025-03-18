import React, { useEffect, useState } from 'react'
import { useCourseStore } from '../../store/useCourseStore.js'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading.jsx'

const MyCourses = () => {

  const { courses, fetchCourses, isFetchingCourses } = useCourseStore()

  const [educatorCourse, seteducatorCourse] = useState(null)

  const navigate = useNavigate()

  async function fetchEducatorCourses(){
    seteducatorCourse(courses)
  }

  useEffect(() =>{
    fetchCourses(navigate)
  }, [])

  useEffect(() =>{
    fetchEducatorCourses()
  }, [courses])

  if(!educatorCourse){
    return (<Loading />)
  }

  return (
    <section className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>
        <table className='table ml-[-10px] '>
          <thead>
            <tr className='border-b text-xs sm:text-sm border-gray-500/20'>
              <th className="font-semibold">Course</th>
              <th className="font-semibold">Earning</th>
              <th className="font-semibold">Student</th>
              <th className="font-semibold">Published</th>
            </tr>
          </thead>

          <tbody>
            {educatorCourse?.map((element, index) =>(
              <tr className='border-b sm:text-sm text-xs border-gray-500/20' key={index}>
                <td className='flex items-center space-x-3'>
                  <img className='w-10 sm:w-16' src={element.courseThumbnail} alt="thumbnail" />
                  <span className='hidden sm:block'>{element.courseTitle}</span>
                </td>
                <td className='text-center'>${Math.floor(element.enrolledStudents.length * (element.coursePrice - ((element.discount * element.coursePrice) / 100)))}</td>
                <td className='text-center'>{element.enrolledStudents.length}</td>
                <td className='text-center'>{new Date(element.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default MyCourses