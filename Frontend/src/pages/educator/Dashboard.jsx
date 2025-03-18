import React, { useEffect, useState } from 'react'
import { dummyDashboardData } from '../../utils/data'
import Loading from '../../components/Loading'
import patientIcon from '../../assets/patients_icon.svg'
import courseIcon from '../../assets/appointments_icon.svg'
import earningIcon from '../../assets/earning_icon.svg'

const Dashboard = () => {

  const [dashboardData, setdashboardData] = useState(null)

  async function fetchDashboardData(){
    setdashboardData(dummyDashboardData)
  }

  useEffect(() =>{
    fetchDashboardData()
  }, [])

  if(!dashboardData){
    return (<Loading />)
  }

  return (
    <section className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='space-y-5'>
        <div className='flex flex-wrap gap-5 items-center'>
          <div className="flex items-center gap-3 border border-blue-500 p-4 w-60 rounded-md">
            <img src={patientIcon} alt="patient" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.enrolledStudentsData.length}</p>
              <p className='text-base text-gray-500'>Total Enrollments</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border border-blue-500 p-4 w-60 rounded-md">
            <img src={courseIcon} alt="course" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.totalCourses}</p>
              <p className='text-base text-gray-500'>Total Courses</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border border-blue-500 p-4 w-60 rounded-md">
            <img src={earningIcon} alt="earning" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.totalEarnings}</p>
              <p className='text-base text-gray-500'>Total Earnings</p>
            </div>
          </div>
        </div>

        <div className='my-14'>
          <h2 className='pb-4 text-lg font-medium'>Latest Enrollments</h2>
          <div>
            <table className='table'>
              <thead>
                <tr className='border-b border-gray-500/20'>
                  <th className="font-semibold hidden sm:block truncate">#</th>
                  <th className="font-semibold truncate">Student Name</th>
                  <th className="font-semibold truncate">Course Title</th>
                </tr>
              </thead>

              <tbody>
                {dashboardData?.enrolledStudentsData?.map((element, index) =>(
                  <tr className='border-b border-gray-500/20' key={index}>
                    <td className='hidden sm:block'>{index + 1}</td>
                    <td>
                      <img className='size-9 rounded-full' src={element.student.imageUrl} alt="Profile" />
                      <span className='truncate'>{element.student.name}</span>
                    </td>
                    <td>{element.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard