import React from 'react'
import Searchbox from '../Searchbox';
import { GiCrescentBlade, GiHamburgerMenu } from 'react-icons/gi';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { WiMoonWaningCrescent2 } from "react-icons/wi";
import { setIsSidebar } from '../../redux/index';
import { IoSettings } from 'react-icons/io5';
const Navbar = () => {
  const isSidebar = useAppSelector(state => state.global.isSidebar)
  const dispatch = useAppDispatch()
  return (
    <div className='flex items-center justify-between px-4 py-3 dark:bg-black'>
      <div className='flex gap-3 md:gap-6'>
        {<GiHamburgerMenu className = {`cursor-pointer p-1 rounded hover:bg-gray-200`} onClick = {() => dispatch(setIsSidebar(true))} size = {30}/>}
        {<Searchbox />}
      </div>
      <div className='flex items-center gap-4'>
        <WiMoonWaningCrescent2 size={30}/>
        <IoSettings size={25}/>
      </div>
    </div>
  )
}

export default Navbar