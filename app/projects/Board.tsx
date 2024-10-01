import { FaPlus } from "react-icons/fa";
import { Task as TaskType, useCreateProjectMutation, useGetTasksQuery, useUpdateTaskMutation } from "../redux/api"
import { FaRegCommentAlt } from "react-icons/fa";
import {DndProvider, useDrag, useDrop} from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import { TouchBackend } from 'react-dnd-touch-backend'
import { SlOptionsVertical } from "react-icons/sl";
import Image from "next/image";
type Props = {
    setIsNewModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    projectId: number
}


const Task = ({task}: {task: TaskType}) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: "task",
        item: {id: task.id},
        collect: (monitor: any) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    const start = task.startDate ? (new Date(task.startDate)).toLocaleDateString("en-US", {day: "numeric", month: "long", year: "numeric"}): "Undecided"
    const end = task.dueDate? (new Date(task.dueDate)).toLocaleDateString("en-US", {day: "numeric", month: "long", year: "numeric"}): "Undecided"
    const bgColor = task.priority === "Urgent" ? "bg-red-600"
                        : task.priority === "High" ? "bg-red-300"
                            : task.priority === "Medium" ? "bg-yellow-400"
                                : task.priority === "Low" ? "bg-green-400"
                                    : "bg-gray-300"

    return(
        <div ref = {(instance) => {drag(instance)}} className={`cursor-pointer active:border-black border shadow-md md:space-y-3 md:p-4`}>
            <div className="flex justify-between items-center">
                <div className="flex gap-3 flex-wrap items-center">
                    <span className="text-gray-500">Tags:</span>
                    <TopTag name={task.priority} color={bgColor}/>
                    {
                        task.tags?.split(",").map((item, index) => {
                            return <TopTag key = {index} name={item} color="bg-blue-500"/>
                        })
                    }
                </div>
                <SlOptionsVertical size = {14} className="fill-gray-500 cursor-pointer"/>
            </div>
            <div>
                <p className="font-medium md:text-2xl">{task.title}</p>
                <div className="md:text-lg text-gray-500">
                    <span>{start}</span>
                    -
                    <span>{end}</span>
                </div>
            </div>
            <p className="md:text-xl">{task.description}</p>
            <div className="h-[1px] bg-gray-200 w-[94%] mx-auto"></div>
            <div className="mt-[10px] flex justify-between items-center">
                <div className="-space-x-2 flex">
                    <img  src = "https://cdn4.iconfinder.com/data/icons/business-conceptual-part1-1/513/business-woman-512.png" className="w-[30px] h-[30px]" alt = ""/>
                    <img  src = "https://cdn3.iconfinder.com/data/icons/avatars-collection/256/14-512.png" className="w-[30px] h-[30px]" alt = ""/>
                </div>
                <div className="flex items-center gap-2">
                    <FaRegCommentAlt size = {18}/>
                    <span className="font-semibold font-gray-500 md:text-lg">{task.comments?.length || 0}</span>
                </div>
            </div>
        </div>
    )
}

const TopTag = (props : {name: string, color:string}) => {
    return (
        <div className={`${props.color} py-1 px-2 text-white w-fit md:text-md rounded-lg`}>
            {props.name}
        </div>
    )
}

const Board = (props: Props) => {
  const {data: taskData, isLoading} = useGetTasksQuery(props.projectId as number)
  const task1 = (taskData && taskData![0]) 
  if(isLoading || !taskData){
    return <></>
  }
  return (
    <DndProvider backend={HTML5Backend} >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 md:gap-y-6 p-2 md:p-4">
            <StatusGroup name = "To Do" tasks={taskData} setIsModalNewTaskOpen={props.setIsNewModalOpen}/>
            <StatusGroup name = "Work In Progress" tasks={taskData} setIsModalNewTaskOpen={props.setIsNewModalOpen}/>
            <StatusGroup name = "Under Review" tasks={taskData} setIsModalNewTaskOpen={props.setIsNewModalOpen}/>
            <StatusGroup name = "Completed" tasks={taskData} setIsModalNewTaskOpen={props.setIsNewModalOpen}/>
        </div>
    </DndProvider>
  )
}

const StatusGroup = ({name, tasks, setIsModalNewTaskOpen} : {
    name: string,
    tasks: TaskType[],
    setIsModalNewTaskOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
    const [updateTask] = useUpdateTaskMutation()
    const [{isOver}, drop] = useDrop(() => ({
        accept: "task",
        drop : ({id} : {id: number}) => updateTask({taskId: id.toString(), status:name}),
        collect: (monitor: any) => ({
            isOver: !!monitor.isOver()
        })
    }))
    const length = tasks.filter(item => item.status === name).length
    const sideColor = name === "To Do" ? "bg-red-400" :
                        name === "Work In Progress" ? "bg-green-400" :
                            name === "Under Review" ? "bg-orange-400" : 
                                "bg-black"
    return (
        <div ref = {(instance) => {drop(instance)} }>
            <div className={`flex justify-between items-center shadow-md border pr-2 rounded-md overflow-hidden ${isOver && "bg-gray-300"}`}>
                <div className={`flex gap-2`}>
                    <div className={`${sideColor} h-full w-[10px] py-8`}></div>
                    <div className="flex md:gap-3 items-center">
                        <h1 className={`md:text-2xl lg:text-3xl font-bold`}>{name}</h1>
                        <p className="text-black bg-gray-200 rounded-full font-medium py-2 px-3">{length}</p>
                    </div>
                </div>
                <div className="flex items-center cursor-pointer">
                    <SlOptionsVertical size = {17}/>
                    <FaPlus size = {20} className="bg-gray-200 p-1"/>
                </div>
            </div>
            <div className="flex flex-col md:gap-4">
                {
                    tasks.filter(item => item.status == name).map((item) => {
                        return <Task task = {item}/>
                    })
                }
            </div>
        </div>
    )
}
export default Board