import React from 'react'
import { menuData } from '../../utils/data'
import { useEducatorStore } from '../../store/useEducatorStore'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {

  const { isEducator } = useEducatorStore()

  return isEducator && (
    <nav className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col'>
      {menuData.map((element) =>(
        <NavLink className={({isActive}) =>`flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive ? "bg-indigo-50 border-r-[6px] border-indigo-500/90" : "hover:bg-gray-100 border-r-[6px] border-white hover:border-gray-100/90"}`} to={element.path} key={element.id} end={element.path === '/educator'}>
          <img src={element.icon} alt="icon" className='size-6' />
          <p className='md:block hidden text-center'>{element.name}</p>
        </NavLink>
      ))}
    </nav>
  )
}

export default Sidebar