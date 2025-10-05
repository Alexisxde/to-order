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

export type Note = {
	_id: string
	name: string
	content: JSON
	id_folder: string | null
	update_at: string | null
	created_at: string
	id_user: string
}

export type Folder = {
	_id: string
	name: string
	created_at: string
	id_root: string | null
	id_user: string
	delete: boolean
}
