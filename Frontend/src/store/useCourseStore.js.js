import { create } from 'zustand'
import { dummyCourses } from '../utils/data'

export const useCourseStore = create((set) =>({
    courses: null,
    enrolledCourses: null,
    error: null,
    isFetchingCourses: false,
    isFetchingUserEnrolledCourses: false,

    fetchCourses: async(navigate) =>{
        set({ isFetchingCourses: true })
        try{
            set({ courses: dummyCourses })
        }
        catch(err){
            console.log(`Error in Fetch Courses - ${err.message}`)
        }
        finally{
            set({ isFetchingCourses: false })
        }
    },

    fetchUserEnrolledCourses: async(navigate) =>{
        set({ isFetchingUserEnrolledCourses: true })
        try{
            set({ enrolledCourses: dummyCourses })
        }
        catch(err){
            console.log(`Error in Fetch User Enrolled Courses - ${err.message}`)
        }
        finally{
            set({ isFetchingUserEnrolledCourses: false })
        }
    },
}))