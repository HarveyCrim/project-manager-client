import { Task, useGetTasksQuery } from "../redux/api"

type Props = {projectId : number}

const List = (props: Props) => {
    const {data: taskData, isLoading} = useGetTasksQuery(props.projectId as number)
    if(isLoading){
        return <></>
    }
  return (
    <div>
        {
            taskData?.map(item => <ListItem task = {item}/>)
        }
    </div>
  )
}

const ListItem = ({task} : {task: Task}) => {
    return <div className="w-[94%] flex flex-col border-t-2 p-2">
         <div className="flex gap-2 text-lg">
            <span className="font-bold">Title:</span>
            <span>{task.title}</span>
         </div>
         <div className="flex gap-2 text-lg">
            <span className="font-bold">Description:</span>
            <span>{task.description}</span>
         </div>
         <div className="flex gap-2 text-lg">
            <span className="font-bold">Status:</span>
            <span>{task.status}</span>
         </div>
         <div className="flex gap-2 text-lg">
            <span className="font-bold">Priority:</span>
            <span>{task.priority}</span>
         </div>
         <div className="flex gap-2 text-lg">
            <span className="font-bold">Tags:</span>
            <span>{task.tags}</span>
         </div>
         
    </div>
}

export default List