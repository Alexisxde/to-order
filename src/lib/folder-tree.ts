import type { Folder, FolderTreeNode } from "@/module/folders/folder.type"

export function buildFolderTree(folders: Folder[], excludeFolderId: string): FolderTreeNode[] {
	const excludedIds = getDescendantIds(folders, excludeFolderId)
	excludedIds.add(excludeFolderId)
	const filtered = folders.filter((f) => !excludedIds.has(f._id))
	function buildChildren(parentId: string | null): FolderTreeNode[] {
		return filtered
			.filter((f) => f.rootId === parentId)
			.sort((a, b) => a.name.localeCompare(b.name))
			.map((f) => ({
				...f,
				children: buildChildren(f._id)
			}))
	}
	return buildChildren(null)
}

function getDescendantIds(folders: Folder[], parentId: string): Set<string> {
	const ids = new Set<string>()
	const directChildren = folders.filter((f) => f.rootId === parentId)
	for (const child of directChildren) {
		ids.add(child._id)
		const grandchildren = getDescendantIds(folders, child._id)
		for (const id of grandchildren) {
			ids.add(id)
		}
	}
	return ids
}
