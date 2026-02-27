"use client"
import { TaskContext } from "@/context/task-provider"
import { useContext } from "react"

export function useTasks() {
	const context = useContext(TaskContext)
	if (!context) throw new Error("useTasks must be used within a TasksProvider")
	return context
}
