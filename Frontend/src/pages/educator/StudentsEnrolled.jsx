import React, { useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../utils/data'

const StudentsEnrolled = () => {
  
  const [enrolledStudents, setenrolledStudents] = useState(null)

  async function fetchEnrolledStudents(){
    setenrolledStudents(dummyStudentEnrolled)
  }

  useEffect(() =>{
    fetchEnrolledStudents()
  }, [])

  return (
    <section>
      <table className='table mt-5'>
        <thead>
          <tr className='border-b border-gray-500/20'>
            <th className="font-semibold hidden sm:table-cell">#</th>
            <th className="font-semibold">Name</th>
            <th className="font-semibold">Course Title</th>
            <th className="font-semibold sm:table-cell hidden">Date</th>
          </tr>
        </thead>

        <tbody>
          {enrolledStudents?.map((element, index) =>(
            <tr className='border-b border-gray-500/20' key={index}>
              <td className='hidden sm:table-cell'>{index + 1}</td>
              <td className='flex sm:flex-row flex-col items-center space-x-3'>
                <img className='size-9 rounded-full' src={element.student.imageUrl} alt="thumbnail" />
                <span>{element.student.name}</span>
              </td>
              <td>{element.courseTitle}</td>
              <td className='sm:table-cell hidden'>{new Date(element.purchaseDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default StudentsEnrolled