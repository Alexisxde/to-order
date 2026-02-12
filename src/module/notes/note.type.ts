export type Note = {
	_id: string
	name: string
	content: JSON
	folderId: string | null
	createdAt: string
	updateAt: string | null
}

export type CreateNoteDto = { name: string; folderId: string | null }
export type UpdateNoteDto = { id: string; name: string; content: unknown; updateAt?: string }
export type DeleteNoteDto = { id: string; deleted?: boolean }
