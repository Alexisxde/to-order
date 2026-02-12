import type { CreateNoteDto, DeleteNoteDto, Note, UpdateNoteDto, MoveNoteDto } from "@/module/notes/note.type"
import { createClient } from "@/supabase/client"

const supabase = createClient()

export async function select(userId?: string): Promise<Note[]> {
	const { data, error } = await supabase
		.from("notes")
		.select("*")
		.eq("userId", userId)
		.order("name", { ascending: true })
	if (error) throw error
	return data
}

export async function create(dto: CreateNoteDto, userId?: string): Promise<Note[]> {
	const { name, folderId } = dto
	const { data, error } = await supabase.from("notes").insert({ name, folderId, userId }).select().single()
	if (error) throw error
	return data
}

export async function update(dto: UpdateNoteDto): Promise<Note> {
	const { id, name, content, updateAt } = dto
	const { data, error } = await supabase
		.from("notes")
		.update({ name, content, updateAt })
		.eq("_id", id)
		.select()
		.single()
	if (error) throw error
	return data
}

export async function deleted(dto: DeleteNoteDto): Promise<Note> {
	const { id, deleted } = dto
	const { data, error } = await supabase.from("notes").update({ deleted }).eq("_id", id).select().single()
	if (error) throw error
	return data
}

export async function move(dto: MoveNoteDto): Promise<Note> {
	const { id, folderId } = dto
	const { data, error } = await supabase.from("notes").update({ folderId }).eq("_id", id).select().single()
	if (error) throw error
	return data
}

export default { select, create, update, deleted, move }
