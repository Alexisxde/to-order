"use client"
import { createClient } from "@/supabase/client"
// import type { Tasks } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"

type Task = {
	_id: string
	title: string
	description?: string
	column: "new" | "progress" | "completed"
	created_at: string
	user_id: string
}

export type TasksContextType = {
	tasks: Task[]
	createTask: (
		time: Omit<Task, "_id" | "created_at" | "user_id">
	) => Promise<void>
	updateTask: (updateTask: Pick<Task, "_id" | "column">) => Promise<void>
	deleteTask: (id: string) => Promise<void>
}

const TasksContext = createContext<TasksContextType | null>(null)
let debounceTimeout: NodeJS.Timeout

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
	const supabase = createClient()
	const [tasks, setTasks] = useState<Task[] | []>([])

	const getTaskss = async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser()
		const { data } = await supabase
			.from("tasks")
			.select()
			.eq("user_id", user?.id)
		setTasks(data as Task[])
	}

	const createTask = async (
		task: Omit<Task, "_id" | "created_at" | "user_id">
	) => {
		try {
			const {
				data: { user }
			} = await supabase.auth.getUser()

			const { data } = await supabase
				.from("tasks")
				.insert({ ...task, user_id: user?.id })
				.select()

			if (!data) throw new Error("Error creating Tasks")
			setTasks(prev => [data[0], ...prev!])
		} catch (error) {
			console.error("Error creating task:", error)
			setTasks(prev => prev)
		}
	}

	const deleteTask = async (id: string) => {
		const currentState = tasks
		const updatedTasks = currentState?.filter(task => task._id != id)
		setTasks(updatedTasks)

		try {
			await supabase.from("tasks").delete().eq("_id", id)
		} catch (error) {
			console.error("Error deleting task:", error) // eslint-disable-line no-console
			setTasks(currentState)
		}
	}

	const updateTask = async (updateTask: Pick<Task, "_id" | "column">) => {
		const { _id, column } = updateTask
		const currentState = tasks
		const updatedTasks = currentState?.map(task =>
			task._id == _id ? { ...task, column } : task
		)
		setTasks(updatedTasks)
		if (debounceTimeout) clearTimeout(debounceTimeout)

		debounceTimeout = setTimeout(async () => {
			try {
				await supabase.from("tasks").update({ column }).eq("_id", _id)
			} catch (error) {
				console.error("Error updating task:", error) // eslint-disable-line no-console
				setTasks(currentState)
			}
		}, 3000)
	}

	useEffect(() => {
		getTaskss()
	}, [])

	return (
		<TasksContext.Provider
			value={{ tasks, createTask, updateTask, deleteTask }}>
			{children}
		</TasksContext.Provider>
	)
}

export const useTask = () => {
	const context = useContext(TasksContext)
	if (!context) throw new Error("useTask must be used within a TasksProvider")
	return context
}
