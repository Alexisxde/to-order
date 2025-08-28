import type { Database, Tables } from "@/supabase/database"

export type Project = Tables<"projects">
export type InsertProject = Database["public"]["Tables"]["projects"]["Insert"]

export type Task = {
	_id: string
	title: string
	description?: string
	url?: string
	column: "new" | "progress" | "completed"
	priority: "low" | "medium" | "high"
	created_at: string
	user_id: string
}
