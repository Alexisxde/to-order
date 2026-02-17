export type Note = {
	_id: string
	name: string
	content: unknown
	folderId: string | null
	fav: boolean
	deleted: boolean
	createdAt: string
	updateAt: string | null
}

export type CreateNoteDto = Pick<Note, "name" | "folderId">
export type UpdateNoteDto = { id: string; name: string; content: unknown; updateAt?: string }
export type DeleteNoteDto = { id: string; deleted: boolean }
export type MoveNoteDto = { id: string; folderId: string | null }
