import React, { useEffect, useRef, useState } from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import dropDownIcon from '../../assets/dropdown_icon.svg'
import fileUploadIcon from '../../assets/file_upload_icon.svg'
import { X } from 'lucide-react'

const AddCourse = () => {

  const quillRef = useRef(null)
  const editorRef = useRef(null)

  const [courseTitle, setcourseTitle] = useState("")
  const [coursePrice, setcoursePrice] = useState(0)
  const [discount, setdiscount] = useState(0)
  const [image, setimage] = useState(null)
  const [chapters, setchapters] = useState([])
  const [showPopUp, setshowPopUp] = useState(false)
  const [currentChapterId, setcurrentChapterId] = useState(null)
  const [lectureDetails, setlectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false
  })

  function handleChapter(action, chapterId){
    if(action === 'add'){
      const title = prompt('Enter Chapter Name: ')
      if(title){
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder: chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1
        }
        setchapters([...chapters, newChapter])
      }
    }
    else if(action === 'remove'){
      setchapters(chapters.filter((element) =>element.chapterId !== chapterId))
    }
    else if(action === 'toggle'){      
      setchapters(
        chapters.map((element) =>element.chapterId === chapterId ? {...element, collapsed: !element.collapsed} : element)
      )
    }
  }

  function handleLecture(action, chapterId, lectureIndex){
    if(action === 'add'){
      setcurrentChapterId(chapterId)
      setshowPopUp(true)
    }
    else if(action === "remove"){
      setchapters(chapters.map((element) =>{
        if(element.chapterId === chapterId){
          element.chapterContent.splice(lectureIndex, 1)
        }
        return element
      }))
    }
  }

  function addLecture(){
    setchapters(chapters.map((element) =>{
      if(element.chapterId === currentChapterId){
        const newLecture = {...lectureDetails, lectureOrder: element.chapterContent.length > 0 ? element.chapterContent.slice(-1)[0].lectureOrder + 1 : 1, lectureId: uniqid()}
        element.chapterContent.push(newLecture)
      }
      return element
    }))
    setshowPopUp(false)
    setlectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false
    })
  }

  async function handleSubmit(event){
    event.preventDefault()
  }

  useEffect(() =>{
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow'
      })
    }
  }, [])

  return (
    <section className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form onSubmit={(event) =>handleSubmit(event)} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="courseTitle">Course Title</label>
          <input type="text" name="courseTitle" id="courseTitle" placeholder='Type here' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="courseDescription">Course Description</label>
          <div ref={editorRef}></div>
        </div>

        <div className='flex justify-between flex-wrap items-center'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="coursePrice">Course Price</label>
            <input type="number" name="coursePrice" id="coursePrice" placeholder='0' value={coursePrice} onChange={(event) =>setcoursePrice(event.target.value)} className='outline-none md:py-2.5 py-2 px-3 w-28 rounded border border-gray-500' required />
          </div>
          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage">
              <img src={image ? URL.createObjectURL(image) : fileUploadIcon} alt="thumbnailImage" className={`${image ? "" : "p-3"} max-h-10 bg-blue-500 rounded`} />
              <input type="file" hidden accept='image/*' id='thumbnailImage' name='thumbnailImage' onChange={(event) =>setimage(event.target.files[0])} />
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor="discount">Discount %</label>
          <input type="number" name="discount" id="discount" placeholder='0' min={0} max={100} value={discount} onChange={(event) =>setdiscount(event.target.value)} className='outline-none md:py-2.5 py-2 px-3 rounded border w-28 border-gray-500' required />
        </div>

        {/* Chapters and Lectures */}
        <div>
          {chapters.map((element, index) =>(
            <div className='bg-white border rounded-lg mb-4' key={index}>
              <div className='flex items-center justify-between p-4 border-b'>
                <div className='flex items-center'>
                  <img onClick={() =>handleChapter('toggle', element.chapterId)} className={`mr-2 cursor-pointer transition-all ${element.collapsed ? "-rotate-90" : ""}`} src={dropDownIcon} alt="dropDownIcon" width={14} />
                  <span className='font-semibold'>{index + 1}. {element.chapterTitle}</span>
                </div>
                <span className='text-gray-500'>{element.chapterContent.length} Lectures</span>
                <X onClick={() =>handleChapter('remove', element.chapterId)} className='cursor-pointer' />
              </div>
              {!element.collapsed && (
                <div className='p-4'>
                  {element.chapterContent.map((item, i) =>(
                    <div key={i} className='flex justify-between items-center mb-2'>
                      <span>{i + 1}. {item.lectureTitle} - {item.lectureDuration} mins - <a href={item.lectureUrl} target='_blank' className='text-blue-500'>Link</a> - {item.isPreviewFree ? 'Free preview' : 'Paid'}</span>
                      <X onClick={() =>handleLecture('remove', element.chapterId, i)} className='cursor-pointer' />
                    </div>
                  ))}
                  <div onClick={() =>handleLecture('add', element.chapterId)} className='inline-flex bg-gray-200 p-2 rounded cursor-pointer mt-2'>
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div onClick={() =>handleChapter('add')} className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer'>
            + Add Chapter
          </div>

          {showPopUp && (
            <div className='fixed inset-0 flex items-center justify-center bg-gray-400'>
              <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
                <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>
              
                <div className='mb-2'>
                  <label htmlFor='lectureTitle'>Lecture Title</label>
                  <input className='mt-1 block w-full rounded py-1 px-2' value={lectureDetails.lectureTitle} onChange={(event) =>setlectureDetails({...lectureDetails, lectureTitle: event.target.value})} type="text" name="lectureTitle" id="lectureTitle" />
                </div>
                <div className='mb-2'>
                  <label htmlFor='lectureDuration'>Lecture Duration (minutes)</label>
                  <input className='mt-1 block w-full rounded py-1 px-2' value={lectureDetails.lectureDuration} onChange={(event) =>setlectureDetails({...lectureDetails, lectureDuration: event.target.value})} type="number" name="lectureDuration" id="lectureDuration" />
                </div>
                <div className='mb-2'>
                  <label htmlFor='lectureUrl'>Lecture URL</label>
                  <input className='mt-1 block w-full rounded py-1 px-2' value={lectureDetails.lectureUrl} onChange={(event) =>setlectureDetails({...lectureDetails, lectureUrl: event.target.value})} type="text" name="lectureUrl" id="lectureUrl" />
                </div>
                <div className='flex gap-2 my-4'>
                  <label htmlFor='previewfree'>Is Preview Free?</label>
                  <input className='mt-0.5 ml-1 rounded' checked={lectureDetails.isPreviewFree} onChange={(event) =>setlectureDetails({...lectureDetails, isPreviewFree: event.target.checked})} type="checkbox" name="previewfree" id="previewfree" />
                </div>

                <button onClick={addLecture} type='button' className='w-full cursor-pointer bg-blue-400 px-4 text-white py-2 rounded'>Add</button>

                <X className='absolute top-4 right-4 size-6 cursor-pointer' onClick={() =>setshowPopUp(false)} />
              </div>
            </div>
          )}
        </div>

        <button type='submit' className='bg-black cursor-pointer text-white w-max py-2.5 px-8 rounded my-4'>ADD</button>
      </form>
    </section>
  )
}

export default AddCourse