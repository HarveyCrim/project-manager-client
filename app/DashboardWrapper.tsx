"use client"
import React from 'react'
import Navbar from './(components)/Navbar'
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from './(components)/Sidebar'
import StoreProvider from './StoreProvider'
import { useAppSelector } from './redux'



  const DashboardLayout = ({children} : {children: React.ReactNode}) => {
  const isSidebar = useAppSelector(state => state.global.isSidebar)
  return (
    <div className='flex w-full h-full bg-gray-50 text-gray-900 relative'>
        {isSidebar && <div className='absolute top-0 h-screen'>
            <Sidebar />
        </div>}
        <main className = {`flex w-full flex-col bg-gray-50 dark:bg-dark-bg bg-gray-50`}>
            <Navbar />
            {children}
        </main>
    </div>
  )
}

export const DashboardWrapper = ({children} : {children: React.ReactNode}) => {
    return (
    <StoreProvider>
        <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>)
}

export default DashboardWrapper