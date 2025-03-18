import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({ data }) => {

  const navigate = useNavigate()

  const [search, setsearch] = useState(data ? data : "")

  function handleSearch(event){
    event.preventDefault()
    navigate(`/course-list/${search}`)
  }

  return (
    <form onSubmit={(event) =>handleSearch(event)} className='max-w-lg w-full h-12 md:h-14 flex items-center bg-white border border-gray-500/20 rounded'>
      <Search className='size-7 text-gray-500/80 sm:size-6 mx-3' />
      <input value={search} onChange={(event) =>setsearch(event.target.value)} type="text" placeholder='Search for courses' className='w-full h-full outline-none text-gray-500/80' />
      <button type="submit" className='bg-blue-600 cursor-pointer text-white md:px-10 px-7 md:py-3 py-2 mx-1'>Search</button>
    </form>
  )
}

export default SearchBar