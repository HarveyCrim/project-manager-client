"use client"
import { setIsSidebar } from '../../redux/index';
import { BsStack } from "react-icons/bs";
import { useAppDispatch } from '@/app/redux';
import { PiTrafficSignalFill } from "react-icons/pi";
import React, { useState } from 'react'
import { PiTrafficConeThin } from "react-icons/pi";
import { CgDanger } from "react-icons/cg";
import { MdOutlineTraffic } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FaAngleDown, FaAngleUp, FaHome, FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { RiTeamLine } from "react-icons/ri";
import { FaLock } from "react-icons/fa";
import {IconType} from "react-icons"
import { FaSuitcase } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { useGetProjectsQuery } from '@/app/redux/api';
interface sidebarLink {
    href: string,
    icon: IconType,
    label: string,
}

const SidebarLink = (props: sidebarLink) => {
    const pathname = usePathname()
    const isActive = pathname === props.href
    return (
        <div className={`w-full flex items-center gap-3 py-3 pl-2 md:pl-4 ${isActive && "bg-gray-400"} ${!isActive && "hover:bg-gray-200"} cursor-pointer`}>
            <props.icon size={25}/>
            <p className='md:text-lg font-medium'>{props.label}</p>
        </div>
    )
}
const Sidebar = () => {
  const [showProjects, setShowProjects] = useState<boolean>(false)
  const [showPriorities, setShowPriorities] = useState<boolean>(false)
  const {data: projectData} = useGetProjectsQuery()
  const dispatch = useAppDispatch()
  return (
    <div className=' flex flex-col shadow-xl
    transition-all duration-1000 h-full z-40 overflow-y-auto bg-white w-[300px] relative py-4 pr-2'>
        <div onClick = {() => dispatch(setIsSidebar(false))} className={`absolute p-1 rounded right-[0px] w-fit hover:rounded hover:bg-gray-100 cursor-pointer`}>
            <IoClose size = {23} />
        </div>
        <h1 className='font-medium md:text-xl mt-4 py-2 pl-4'>INVENTORY</h1>
        <div className='w-full h-[0.5px] bg-gray-300 mt-2'></div>
        <div className='flex items-center px-2 py-4 gap-4'>
            <FaUser size = {32}/>
            <div className='flex flex-col'>
                <p className='font-semibold text-lg'>EdRoh Team</p>
                <div className='flex items-center gap-1'>
                    <FaLock size = {15}/>
                    <span className='md:text-lg'>Private</span>
                </div>
            </div>
        </div>
        <div className='w-full h-[0.5px] bg-gray-300 mt-2'></div>
        <nav>
            <SidebarLink icon = {FaHome} label = "Home" href = "/"/>
            <SidebarLink icon = {FaSearch} label = "Search" href = "/search"/>
            <SidebarLink icon = {FaSuitcase} label = "Timeline" href = "/timeline"/>
            <SidebarLink icon = {IoIosSettings} label = "Settings" href = "/settings"/>
            <SidebarLink icon = {FaUser} label = "User" href = "/user"/>
            <SidebarLink icon = {RiTeamLine} label = "Teams" href = "/teams"/>
        </nav>
        <div className='flex items-center justify-between p-3'>
            <p className='font-medium md:text-xl'>Projects</p>
            {showProjects && <FaAngleUp className="cursor-pointer"size = {23} onClick = {() => setShowProjects(false)}/>}
            {!showProjects && <FaAngleDown className="cursor-pointer"size = {23} onClick = {() => setShowProjects(true)}/>}
        </div>
        {
            showProjects && 
            <nav>
                {
                    projectData?.map((item) => {
                        return <SidebarLink key = {item.id} icon = {FaSuitcase} label = {item.name} href={`/projects/${item.id}`}/>
                    })
                }
            </nav>
        }
        <div className='flex items-center justify-between p-3'>
            <p className='font-medium md:text-xl'>Priorities</p>
            {showPriorities && <FaAngleUp className="cursor-pointer"size = {23} onClick = {() => setShowPriorities(false)}/>}
            {!showPriorities && <FaAngleDown className="cursor-pointer"size ={23} onClick = {() => setShowPriorities(true)}/>}
        </div>
        {
            showPriorities && 
            <nav>
                <SidebarLink icon = {CgDanger} label = "Urgent" href = "/priorities/urgent"/>
                <SidebarLink icon = {PiTrafficSignalFill} label = "High" href = "/priorities/high"/>
                <SidebarLink icon = {MdOutlineTraffic} label = "Medium" href = "/priorities/medium"/>
                <SidebarLink icon = {PiTrafficConeThin} label = "Low" href = "/priorites/low"/>
                <SidebarLink icon = {BsStack} label = "Backlog" href = "/priorities/backlog"/>
            </nav>
        }
    </div>
  )
}

export default Sidebar