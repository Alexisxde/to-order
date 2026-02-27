import type { Task } from "@/module/tasks/task.type"
import { createClient } from "@/supabase/client"

const supabase = createClient()

export async function select(userId?: string): Promise<Task[]> {
	const { data, error } = await supabase.from("tasks").select("*").eq("userId", userId)
	if (error) throw error
	return data
}

export default { select }
