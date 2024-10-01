"use client"
import React, { useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { IoIosClose } from "react-icons/io";
const Searchbox = () => {
  const [text, setText] = useState<string>("")
  return (
    <div className='flex items-center border bg-gray-200 md:w-[300px] justify-between p-1'>
        <div className='flex items-center gap-1 w-[100%]'>
            <IoIosSearch size = {18}/>
            <input value = {text} onChange = {e => setText(e.target.value)} className="focus:outline-none focus:border-none bg-gray-200 placeholder-gray-400 text-lg w-[100%]" placeholder = "Search..."/>
        </div>
        {text.length > 0 && <IoIosClose className = "cursor-pointer" onClick={e => setText("")} size = {22}/>}
    </div>
  )
}

export default Searchbox