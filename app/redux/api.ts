import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { url } from 'inspector'
type Project = {
    id : number,
    name: string,
    description?: string,
    startDate?: string,
    endDate?: string
}

export enum Priority {
    urgent = "Urgent",
    high = "High",
    medium = "Medium",
    low = "Low",
    backlog = "Backlog"
}

export enum Status {
    toDo = "To Do",
    workInProgress= "Work In Progress",
    underReview = "Under Review",
    Completed = "Completed"
}

export type User = {
    userId: number,
    username: string,
    email: string,
    profilePictureUrl?: string,
    cognitoId?: string,
    teamId?: number
}

export type Attachment = {
    id: number,
    fileURL: string,
    fileName: string,
    taskId: number,
    uploadedById: number
}

export type Comment = {
    id: number,
    text: string
    taskId: number,
    userId: number,
}

export type Task = {
    id: number,
    title: string,
    description: string,
    status: string,
    priority: string,
    tags?:string,
    startDate?: string,
    dueDate?: string,
    points?: number,
    projectId: number,
    authorUserId: number,
    assignedUserId: number

    author?:User,
    assignee?: User,
    comments?: Comment[],
    attachments?: Attachment[]
}

const base_url = process.env.NEXT_PUBLIC_API_BACKEND_URL
export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
    reducerPath: "api",
    tagTypes: ["projects", "tasks"],
    endpoints: (build) => ({
        getProjects : build.query<Project[], void>({
            query: () => ({
                url: "projects",
                method: "get"
            }),
            providesTags: ["projects"]
        }),
        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: "projects",
                method: "post",
                body: project
            }),
            invalidatesTags: ["projects"]
        }),
        getTasks: build.query<Task[], number>({
            query: (projectId) => ({
                url: `tasks?projectId=${projectId}`,
                method: "get",
            }),
            providesTags: (result) => 
                result 
                ? result.map(({id}) => ({type: "tasks", id}) as const)
                : [{type: "tasks"} as const]
            
        }),
        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: "tasks",
                method: "post",
                body: task
            }),
            invalidatesTags: ["tasks"]
        }),
        updateTask: build.mutation<Task, {taskId: string, status: string}>({
            query: ({taskId, status}) => ({
                url: `tasks/update?taskId=${taskId}&status=${status}`,
                method: "put",
            }),
            invalidatesTags: (result, error, {taskId}) => [{type: "tasks", id: taskId}]
        })
    })
})

export const {useGetProjectsQuery, useCreateProjectMutation, useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation} = api