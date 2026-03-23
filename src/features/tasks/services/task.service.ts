import { createClient } from "@/supabase/client"
import type { CreateTaskDto, Task } from "../task.type"

const supabase = createClient()

export async function select(userId?: string): Promise<Task[]> {
	if (!userId) return []
	const { data, error } = await supabase.from("tasks").select("*").eq("userId", userId)
	if (error) throw error
	return data
}

export async function insert(task: CreateTaskDto, userId?: string): Promise<Task> {
	if (!userId) throw new Error("User ID is required")
	const { data, error } = await supabase
		.from("tasks")
		.insert([{ ...task, userId }])
		.select()
		.single()
	if (error) throw error
	return data
}

export async function update(taskId: string, task: Partial<Task>): Promise<Task> {
	const { data, error } = await supabase.from("tasks").update(task).eq("_id", taskId).select().single()
	if (error) throw error
	return data
}

export async function remove(taskId: string): Promise<void> {
	const { error } = await supabase.from("tasks").delete().eq("_id", taskId)
	if (error) throw error
}

export default { select, insert, update, remove }
