"use client"
import { useState } from "react"
import ProjectHeader from "../ProjectHeader"
import Board from "../Board"
import List from "../List"
import Timeline from "../Timeline"
import Tables from "../Tables"

type Props = {
    params : {id: string}
}

const Project = (props: Props) => {
  const {id} = props.params
  const [activeTab, setActiveTab] = useState("Boards")
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState<boolean>(false)
  return (
    <div>
        <ProjectHeader activeTab = {activeTab} setActiveTab = {setActiveTab} name = "Project Design"/>
        {activeTab === "Boards" && <Board setIsNewModalOpen={setIsModalNewTaskOpen} projectId={Number(id)}/>}
        {activeTab === "Lists" && <List projectId={Number(id)}/>}
        {activeTab === "Timeline" && <Timeline />}
        {activeTab === "Tables" && <Tables />}
    </div>
  )
}

export default Project