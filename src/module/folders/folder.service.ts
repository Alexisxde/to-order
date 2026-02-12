import type {
	CreateFolderDto,
	DeleteFolderDto,
	Folder,
	MoveFolderDto,
	UpdateFolderDto
} from "@/module/folders/folder.type"
import { createClient } from "@/supabase/client"

const supabase = createClient()

export async function select(userId?: string): Promise<Folder[]> {
	const { data, error } = await supabase
		.from("folders")
		.select("*")
		.eq("userId", userId)
		.order("name", { ascending: true })
	if (error) throw error
	return data
}

export async function create({ name, rootId }: CreateFolderDto, userId?: string): Promise<Folder> {
	const { data, error } = await supabase.from("folders").insert({ name, rootId, userId }).select()
	if (error || !data) throw error ?? new Error("Error al crear carpeta")
	return data[0] as Folder
}

export async function update({ id, name }: UpdateFolderDto): Promise<Folder> {
	const { data, error } = await supabase.from("folders").update({ name }).eq("_id", id).select()
	if (error || !data) throw error ?? new Error("Error al renombrar carpeta")
	return data[0] as Folder
}

export async function deleted({ id, deleted }: DeleteFolderDto): Promise<Folder> {
	const { data, error } = await supabase
		.from("folders")
		.update({ delete: deleted ?? true })
		.eq("_id", id)
		.select()
	if (error || !data) throw error ?? new Error("Error al eliminar carpeta")
	return data[0] as Folder
}

export async function move({ id, rootId }: MoveFolderDto): Promise<Folder> {
	const { data, error } = await supabase.from("folders").update({ rootId }).eq("_id", id).select()
	if (error || !data) throw error ?? new Error("Error al mover carpeta")
	return data[0] as Folder
}

export default { select, create, update, deleted, move }
