import React from 'react'
import starImg from '../../assets/rating_star.svg'
import starBlankImg from '../../assets/star_dull_icon.svg'
import { Link } from 'react-router-dom'
import { calculateRating } from '../../utils/utils'

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course._id}`} className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'>
      <img src={course.courseThumbnail} alt="courseThumbnail" className='w-full' />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
        <p className='text-gray-500'>{course.educator.name || "GreakStack"}</p>
        <div className='flex items-center gap-x-2'>
          <p>{calculateRating(course.courseRatings)}</p>
          <div className='flex items-center'>
            {[...Array(5)].map((_, i) =>(
              <img key={i} src={i < Math.floor((calculateRating(course.courseRatings))) ? starImg : starBlankImg} alt="starImg" className='size-3.5' />
            ))}
          </div>
          <p className='text-gray-500'>({course.courseRatings.length})</p>
        </div>
        <p className='font-semibold text-gray-800'>${(course.coursePrice - ((course.discount * course.coursePrice) / 100)).toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default CourseCard