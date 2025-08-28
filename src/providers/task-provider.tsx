"use client"
import { useToast } from "@/components/ui/toast"
import { createClient } from "@/supabase/client"
import type { Task } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"

export type TasksContextType = {
	tasks: Task[]
	getTaskId: (id: string) => Task | undefined
	createTask: (
		task: Omit<Task, "_id" | "created_at" | "column" | "priority" | "user_id">
	) => Promise<void>
	updateTask: (updateTask: Task) => Promise<void>
	deleteTask: (id: string) => Promise<void>
}

const TasksContext = createContext<TasksContextType | null>(null)
let debounceTimeout: NodeJS.Timeout

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
	const supabase = createClient()
	const { toast } = useToast()
	const [tasks, setTasks] = useState<Task[] | []>([])

	const getTasks = async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser()
		const { data } = await supabase
			.from("tasks")
			.select()
			.eq("user_id", user?.id)
		setTasks(data as Task[])
	}

	const getTaskId = (id: string) => {
		const currentState = tasks
		const task = currentState?.find(task => task._id == id)
		return task
	}

	const createTask = async (
		task: Omit<Task, "_id" | "created_at" | "column" | "priority" | "user_id">
	) => {
		try {
			const {
				data: { user }
			} = await supabase.auth.getUser()

			const { data } = await supabase
				.from("tasks")
				.insert({ ...task, column: "new", user_id: user?.id })
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
			const { data } = await supabase
				.from("tasks")
				.delete()
				.eq("_id", id)
				.select()
			toast.success({ text: data?.[0].title, description: "Tarea eliminada" })
		} catch (error) {
			console.error("Error deleting task:", error) // eslint-disable-line no-console
			setTasks(currentState)
		}
	}

	const updateTask = async (updateTask: Task) => {
		const { _id } = updateTask
		const currentState = tasks
		const updatedTasks = currentState?.map(task =>
			task._id == _id ? { ...updateTask } : task
		)
		setTasks(updatedTasks)
		toast.success({ text: updateTask.title, description: "Tarea guardada." })

		if (debounceTimeout) clearTimeout(debounceTimeout)
		debounceTimeout = setTimeout(async () => {
			try {
				await supabase.from("tasks").update({ updateTask }).eq("_id", _id)
			} catch (error) {
				console.error("Error updating task:", error) // eslint-disable-line no-console
				setTasks(currentState)
			}
		}, 3000)
	}

	useEffect(() => {
		getTasks()
	}, [])

	return (
		<TasksContext.Provider
			value={{ tasks, getTaskId, createTask, updateTask, deleteTask }}>
			{children}
		</TasksContext.Provider>
	)
}

export const useTask = () => {
	const context = useContext(TasksContext)
	if (!context) throw new Error("useTask must be used within a TasksProvider")
	return context
}
