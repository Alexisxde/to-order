"use client"
import { useToast } from "@/components/ui/toast"
import { createClient } from "@/supabase/client"
import type { Task } from "@/types"
import { createContext, useEffect, useState } from "react"

export type TasksContextType = {
	tasks: Task[]
	getTaskId: (id: string) => Task | undefined
	createTask: (task: Omit<Task, "_id" | "created_at" | "column" | "priority" | "user_id">) => Promise<void>
	updateTaskColumn: (_id: string, column: Task["column"]) => Promise<void>
	updateTask: (updateTask: Task) => Promise<void>
	deleteTask: (id: string) => Promise<void>
}

export const TasksContext = createContext<TasksContextType | null>(null)

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
	const supabase = createClient()
	const { toast } = useToast()
	const [tasks, setTasks] = useState<Task[] | []>([])

	const getTasks = async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser()
		const { data } = await supabase.from("tasks").select().eq("user_id", user?.id)
		setTasks(data as Task[])
	}

	const getTaskId = (id: string) => {
		const currentState = tasks
		const task = currentState?.find(task => task._id == id)
		return task
	}

	const createTask = async (task: Omit<Task, "_id" | "created_at" | "column" | "priority" | "user_id">) => {
		try {
			const {
				data: { user }
			} = await supabase.auth.getUser()

			const { data, error } = await supabase
				.from("tasks")
				.insert({ ...task, column: "new", user_id: user?.id })
				.select()
			if (!data) throw new Error("Error al crear la tarea")
			if (!error) {
				toast.success({
					text: data?.[0].title,
					description: "Tarea creada correctamente."
				})
			}
			setTasks(prev => [data[0], ...prev])
		} catch (error) {
			toast.error({
				text: error instanceof Error ? error.message : "A ocurrido un error",
				description: "Error al crear la tarea."
			})
			setTasks(prev => prev)
		}
	}

	const deleteTask = async (id: string) => {
		const currentState = tasks
		const updatedTasks = currentState?.filter(task => task._id != id)
		setTasks(updatedTasks)

		try {
			const { data, error } = await supabase.from("tasks").delete().eq("_id", id).select()
			if (!data) throw new Error("Error al eliminar una tarea.")
			if (!error) {
				toast.success({
					text: data?.[0].title,
					description: "Tarea eliminada correctamente."
				})
			}
		} catch (error) {
			toast.error({
				text: error instanceof Error ? error.message : "A ocurrido un error",
				description: "Error al eliminar la tarea."
			})
			setTasks(currentState)
		}
	}

	const updateTaskColumn = async (_id: string, column: Task["column"]) => {
		const currentState = tasks
		const updatedTasks = currentState?.map(task => (task._id == _id ? { ...task, column } : task))
		setTasks(updatedTasks)

		try {
			const { data } = await supabase.from("tasks").update({ column }).eq("_id", _id).select()
			if (!data) throw new Error("Error al actualizar la tarea.")
		} catch (error) {
			toast.error({
				text: error instanceof Error ? error.message : "A ocurrido un error",
				description: "Error al actualizar la tarea."
			})
			setTasks(currentState)
		}
	}

	const updateTask = async (updateTask: Task) => {
		const { _id } = updateTask
		const currentState = tasks
		const updatedTasks = currentState?.map(task => (task._id == _id ? { ...updateTask } : task))
		setTasks(updatedTasks)

		try {
			const { data, error } = await supabase
				.from("tasks")
				.update({
					column: updateTask.column,
					title: updateTask.title,
					description: updateTask.description,
					priority: updateTask.priority,
					url: updateTask.url
				})
				.eq("_id", _id)
				.select()
			if (!data) throw new Error("Error al actualizar la tarea.")
			if (!error) {
				toast.success({
					text: data?.[0].title,
					description: "Tarea actualizada correctamente."
				})
			}
		} catch (error) {
			toast.error({
				text: error instanceof Error ? error.message : "A ocurrido un error",
				description: "Error al actualizar la tarea."
			})
			setTasks(currentState)
		}
	}

	useEffect(() => {
		getTasks()
	}, [])

	return (
		<TasksContext.Provider
			value={{
				tasks,
				getTaskId,
				createTask,
				updateTaskColumn,
				updateTask,
				deleteTask
			}}>
			{children}
		</TasksContext.Provider>
	)
}
