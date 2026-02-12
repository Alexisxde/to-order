export type Folder = {
	_id: string
	name: string
	createdAt: string
	rootId: string | null
	fav: boolean
	delete: boolean
}

export type CreateFolderDto = { name: string; rootId: string | null }
export type UpdateFolderDto = { id: string; name: string }
export type MoveFolderDto = { id: string; rootId: string | null }
export type DeleteFolderDto = { id: string; deleted?: boolean }
export type FolderTreeNode = Folder & {
	children: FolderTreeNode[]
}
