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
import { calculateRating, calculateChapterTime, calculateCourseDuration, calculateNoOfLectures } from '../../utils/utils.js'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/student/Footer.jsx'
import YouTube from 'react-youtube';

const CourseDetails = () => {

  const { id } = useParams()

  const navigate = useNavigate()
  const { fetchCourses, isFetchingCourses, courses } = useCourseStore()

  const [eachCourse, seteachCourse] = useState(null)
  const [isEnrolled, setisEnrolled] = useState(false)
  const [playerData, setplayerData] = useState(null)

  function fetchEachCourse(){
    const EachCourse = courses?.find((element) =>element._id == id)
    seteachCourse(EachCourse)
  }

  useEffect(() =>{
    fetchCourses(navigate)
  }, [])

  useEffect(() => {
    if (courses?.length > 0){
      fetchEachCourse()
    }
  }, [courses, id])

  if (isFetchingCourses) {
    return <Loading />
  }

  return (
    <>
      <section className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between lg:px-32 sm:px-20 px-8 pt-20 text-left'>
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-100/70">
        </div>

        {/* Left */}
        <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='md:text-4xl text-2xl font-semibold text-gray-800'>{eachCourse?.courseTitle}</h1>
          <p className='pt-4 md:text-base text-sm' dangerouslySetInnerHTML={{__html: eachCourse?.courseDescription.slice(0, 200)}}></p>
        
          <div className='flex items-center gap-x-2 pt-3 pb-1 text-sm'>
            <p>{eachCourse && calculateRating(eachCourse?.courseRatings)}</p>
            <div className='flex items-center'>
              {[...Array(5)].map((_, i) =>(
                <img key={i} src={eachCourse && i < Math.floor((calculateRating(eachCourse?.courseRatings))) ? starImg : starBlankImg} alt="starImg" className='size-3.5' />
              ))}
            </div>
            <p className='text-blue-600'>({eachCourse?.courseRatings?.length} {eachCourse?.courseRatings?.length > 1 ? "ratings" : "rating"})</p>
            <p>{eachCourse?.enrolledStudents?.length} {eachCourse?.enrolledStudents?.length > 1 ? "students" : "student"}</p>  
          </div>  

          <p className='text-sm'>Course by <span className='underline text-blue-600'>{eachCourse?.educator?.name || "GreakStack"}</span></p>    
        
          <div className='pt-8 text-gray-800'>
              <h2 className='text-xl font-semibold'>Course Structure</h2>
              {/* Accordion */}
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
                            <img src={playIcon} alt="playIcon" className='size-4' />
                            <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-sm'>
                              <p>{item.lectureTitle}</p>
                              <div className='flex gap-2'>
                                {item.isPreviewFree && <p className='text-blue-500 cursor-pointer' onClick={() =>setplayerData({videoId: item?.lectureUrl?.split('/')?.pop()})}>Preview</p>}
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
    
              <div className='py-14 text-sm md:text-base'>
                <h2 className='text-xl font-semibold text-gray-800'>Course Description</h2>
                <p className='pt-3 rich-text' dangerouslySetInnerHTML={{__html: eachCourse?.courseDescription}}></p>
              </div>
          </div>
        </div>
        
        {/* Right */}
        <div className='z-10 shadow-lg max-w-[424px] rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[370px] lg:min-w-[420px]'>
          {playerData ? <YouTube videoId={playerData.videoId} opts={{playerVars: {autoplay: 1}}} iframeClassName='w-full aspect-video' /> : <img src={eachCourse?.courseThumbnail} alt="courseThumbnail" />}
          <div className='p-5'>
            <div className='gap-2 flex items-center'>
              <img className='w-3.5' src={clockLeftImg} alt="clockLeftImg" />
              <p><span className='text-red-500'>5 days</span> left at this price!</p>
            </div>

            <div className='flex gap-3 items-center pt-2'>
              <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>${(eachCourse?.coursePrice - ((eachCourse?.discount * eachCourse?.coursePrice) / 100)).toFixed(2)}</p>
              <p className='md:text-lg text-gray-500 line-through'>${eachCourse?.coursePrice}</p>
              <p className='md:text-lg text-gray-500'>${eachCourse?.discount}% off</p>
            </div>

            <div className='flex items-center test-sm md:text-base gap-4 pt-2 md:pt-4 text-gray-500'>
              <div className='flex items-center gap-1'>
                <img src={starImg} alt="starImg" />
                <p>{eachCourse && calculateRating(eachCourse?.courseRatings)}</p>
              </div>
              <div className='h-4 w-px bg-gray-500/40'>
                {/* Veritical Line */}
              </div>

              <div className='flex items-center gap-1'>
                <img src={clockImg} alt="clockImg" />
                <p>{eachCourse && calculateCourseDuration(eachCourse)}</p>
              </div>
              <div className='h-4 w-px bg-gray-500/40'>
                {/* Veritical Line */}
              </div>
              
              <div className='flex items-center gap-1'>
                <img src={bookImg} alt="bookImg" />
                <p>{eachCourse && calculateNoOfLectures(eachCourse)} lessons</p>
              </div>
            </div>

            <button className='text-white cursor-pointer w-full py-3 rounded bg-blue-600 font-medium md:mt-6 mt-4'>{isEnrolled ? "Already Enrolled" : "Enroll Now"}</button>
          
            <div className='pt-6'>
              <p className='md:text-xl text-lg font-medium text-gray-800'>What's in the course?</p>
              <ul className='ml-4 pt-2 text-sm md:text-base list-disc text-gray-500'>
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  )
}

export default CourseDetails