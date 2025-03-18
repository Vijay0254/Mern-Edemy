import React, { useEffect, useState } from 'react'
import { useCourseStore } from '../../store/useCourseStore.js'
import starImg from '../../assets/rating_star.svg'
import starBlankImg from '../../assets/star_dull_icon.svg'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../components/Loading.jsx'
import playIcon from '../../assets/play_icon.svg'
import clockLeftImg from '../../assets/time_left_clock_icon.svg'
import clockImg from '../../assets/time_clock_icon.svg'
import bookImg from '../../assets/lesson_icon.svg'
import blueTickIcon from '../../assets/blue_tick_icon.svg'
import { calculateRating, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures } from '../../utils/utils.js'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/student/Footer.jsx'
import YouTube from 'react-youtube';
import Rating from '../../components/student/Rating.jsx'

const Player = () => {

  const navigate = useNavigate()
  const { fetchUserEnrolledCourses, isFetchingUserEnrolledCourses, enrolledCourses } = useCourseStore()

  const [eachCourse, seteachCourse] = useState(null)
  const [isEnrolled, setisEnrolled] = useState(false)
  const [playerData, setplayerData] = useState(null)

  const { courseId } = useParams()

  function fetchEachCourse(){
    const EachCourse = enrolledCourses?.find((element) =>element._id == courseId)
    seteachCourse(EachCourse)
  }

  useEffect(() =>{
    fetchUserEnrolledCourses(navigate)
  }, [])

  useEffect(() => {
    if (enrolledCourses?.length > 0){
      fetchEachCourse()
    }
  }, [enrolledCourses, courseId])

  return (
    <>
      <section className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-20 lg:px-36'>
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>

          <div className='pt-5'>
            {eachCourse?.courseContent?.map((element, index) =>(
              <div key={index} className="collapse mb-2 collapse-arrow bg-white border-gray-300 border">
                <input type="checkbox" />
                <div className="collapse-title flex gap-x-2 justify-between items-center font-semibold">
                  <span className='lg:text-base sm:text-sm text-xs'>{element?.chapterTitle}</span>
                  <span className='font-medium lg:text-sm text-xs'>{element?.chapterContent?.length} lectures - {calculateChapterTime(element)}</span>
                </div>
                <div className="collapse-content text-sm">
                  <ul className='list-disc py-2 text-gray-600 space-y-2.5 sm:px-2 lg:px-7 border-t border-gray-300'>
                    {element?.chapterContent?.map((item, i) =>(
                      <li key={i} className='flex items-center gap-2'>
                        <img src={false ? blueTickIcon : playIcon} alt="playIcon" className='size-4' />
                        <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-sm'>
                          <p>{item.lectureTitle}</p>
                          <div className='flex gap-2'>
                            {item.lectureUrl && <p className='text-blue-500 cursor-pointer' onClick={() =>setplayerData({...item, chapter: index + 1, lecture: i + 1})}>Watch</p>}
                            <p>{humanizeDuration(item.lectureDuration * 60 * 1000, {units: ["h", "m"]})}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>  

          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this Course</h1>
            <Rating initialRating={0}  />
          </div>    
        
        </div>

        <div className='md:mt-10'>
          {playerData ? 
            <div className=''>
              <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full h-auto aspect-video' />
              <div className='flex items-center justify-between mt-1'>
                <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                <button className='text-blue-600'>{false ? "Completed" : "Mark as Complete"}</button>
              </div>
            </div> : 
            <img src={eachCourse?.courseThumbnail} alt="courseThumbnail" />
          }
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Player