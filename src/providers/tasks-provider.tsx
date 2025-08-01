"use client"
// import type { Task } from "@/types"
import { createContext, useContext } from "react"

export type TasksContextType = {}

const TasksContext = createContext<TasksContextType | null>(null)

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
	return <TasksContext.Provider value={{}}>{children}</TasksContext.Provider>
}

export const useTasks = () => {
	const context = useContext(TasksContext)
	if (!context)
		throw new Error("useTasks must be used within a useTasksProvider")
	return context
}
