import React, { useState } from 'react'
import { useCourseStore } from '../../store/useCourseStore.js'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { calculateCourseDuration } from '../../utils/utils'
import Loading from '../../components/Loading.jsx'
import { Line } from 'rc-progress'
import Footer from '../../components/student/Footer.jsx'

const MyEnrollments = () => {

  const { fetchUserEnrolledCourses, isFetchingUserEnrolledCourses, enrolledCourses } = useCourseStore()

  const navigate = useNavigate()

  const [progressArray, setprogressArray] = useState([
    {lectureCompleted: 2, totalLecture: 4},
    {lectureCompleted: 1, totalLecture: 5},
    {lectureCompleted: 3, totalLecture: 6},
    {lectureCompleted: 4, totalLecture: 4},
    {lectureCompleted: 0, totalLecture: 3},
    {lectureCompleted: 5, totalLecture: 7},
    {lectureCompleted: 6, totalLecture: 8},
    {lectureCompleted: 2, totalLecture: 6},
    {lectureCompleted: 4, totalLecture: 10},
    {lectureCompleted: 3, totalLecture: 5},
    {lectureCompleted: 7, totalLecture: 7},
    {lectureCompleted: 1, totalLecture: 4},
    {lectureCompleted: 0, totalLecture: 2},
    {lectureCompleted: 5, totalLecture: 5}
  ])

  useEffect(() =>{
    fetchUserEnrolledCourses(navigate)
  }, [])

  return (
    <>
      <section className='md:px-36 px-8 pt-10'>
        <h1 className='text-2xl font-semibold'>My Enrollments</h1>

        {!isFetchingUserEnrolledCourses ? 
          <table className='table mt-10'>
            <thead>
              <tr className='border-b border-gray-500/20'>
                <th className="font-semibold truncate">Course</th>
                <th className="max-sm:hidden font-semibold truncate">Duration</th>
                <th className="font-semibold truncate">Completed</th>
                <th className="font-semibold truncate">Status</th>
              </tr>
            </thead>

            <tbody>
              {enrolledCourses?.map((element, index) =>(
                <tr className='border-b border-gray-500/20' key={index}>
                  <td className='flex sm:flex-row flex-col gap-y-2 sm:items-center gap-x-3'>
                    <img src={element.courseThumbnail} alt="Thumbnail" className='w-14 sm:w-24 md:w-28' />
                    <div className='flex-1'>
                      <p className='mb-1 max-sm:text-xs'>{element.courseTitle}</p>
                      <Line strokeWidth={2} percent={(progressArray[index].lectureCompleted / progressArray[index].totalLecture) * 100} className='bg-gray-300 rounded-full' />
                    </div>
                  </td>
                  <td className='max-sm:hidden'>{calculateCourseDuration(element)}</td>
                  <td>{progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLecture}`} <span>Lectures</span></td>
                  <td>
                    <button onClick={() =>navigate(`/player/${element._id}`)} className='px-3 rounded lg:px-5 py-1.5 cursor-pointer bg-blue-600 lg:text-sm text-xs text-white'>{progressArray[index] && (progressArray[index].lectureCompleted !== progressArray[index].totalLecture ? "On Going" : "Completed")}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> :
          <Loading />
        }
      </section>

      <Footer />
    </>
  )
}

export default MyEnrollments