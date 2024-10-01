import { IconType } from "react-icons"
import { FaRegClipboard, FaTableCells } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";
import { IoIosClose, IoIosFunnel, IoIosSearch } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
type Props = {
    activeTab: string,
    setActiveTab: React.Dispatch<React.SetStateAction<string>>,
    name:string,
    isButtoned?: boolean
}

const ProjectHeader = (
    {
        isButtoned = false,
        name,
        setActiveTab,
        activeTab
    }
    : Props) => {
  return (
    <div className="w-full">
        <div>
            <p className="text-2xl md:text-4xl p-3 font-bold md:p-0font-medium">{name}</p>
            {/* optional button */}
        </div>
        <div className="border-b border-t mt-2 md:mt-0 pt-2 border-gray-300 flex items-center justify-between px-4 flex-wrap-reverse">
            <div className="flex gap-3 md:gap-6">
                <ProjectHeaderButton icon={FaRegClipboard} name = "Boards" isActive={activeTab} setActive={setActiveTab}/>
                <ProjectHeaderButton icon={CiBoxList} name = "Lists" isActive={activeTab} setActive={setActiveTab}/>
                <ProjectHeaderButton icon={FaRegClock} name = "Timeline" isActive={activeTab} setActive={setActiveTab}/>
                <ProjectHeaderButton icon={FaTableCells} name = "Tables" isActive={activeTab} setActive={setActiveTab}/>
            </div>
            <div className="flex items-center gap-3">
                <IoIosFunnel className="cursor-pointer" size = {20}/>
                <IoMdShare className="cursor-pointer" size = {20}/>
                <div className='flex items-center border bg-gray-100 justify-between p-1'>
                    <div className='flex items-center gap-1 w-[100%]'>
                        <IoIosSearch size = {18}/>
                        <input  className="focus:outline-none focus:border-none bg-gray-100 placeholder-gray-400 md:text-lg w-[100%]" placeholder = "Search for Tasks..."/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

type ProjectHeaderButtonProps = {
    name: string,
    icon: IconType,
    isActive: string,
    setActive:React.Dispatch<React.SetStateAction<string>>
}

const ProjectHeaderButton = (props: ProjectHeaderButtonProps) => {
    const activeTab = props.isActive === props.name
    return (
        <div onClick= {() => props.setActive(props.name)} className={`flex h-[45px] font-medium cursor-pointer border-b-4 ${!activeTab && "border-b-white text-gray-500"} items-center ${activeTab && "text-blue-600 border-b-blue-600"} gap-1.5`}>
            < props.icon size={18}/>
            <p className="md:text-lg">{props.name}</p>
        </div>
    )
}

export default ProjectHeader