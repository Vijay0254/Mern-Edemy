import humanizeDuration from 'humanize-duration'

export const calculateRating = (ratings) =>{
    if(ratings.length === 0){
        return 0
    }
    let totalRating = 0
    for(let i of ratings){
        totalRating += i.rating
    }
    return totalRating / ratings.length
}

export const calculateChapterTime = (chapter) =>{
    let time = chapter.chapterContent.reduce((acc, element) => acc + element.lectureDuration, 0);
    return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
}

export const calculateCourseDuration = (course) =>{
    let time = course.courseContent.reduce((totalTime, element) => {
        return totalTime + element.chapterContent.reduce((chapterTime, item) => {
            return chapterTime + item.lectureDuration;
        }, 0);
    }, 0);
    return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]})
}

export const calculateNoOfLectures = (course) =>{
    let totalLectures = 0
    course.courseContent.forEach(element =>{
        if(Array.isArray(element.chapterContent)){
            totalLectures += element.chapterContent.length
        }
    })

    return totalLectures
}