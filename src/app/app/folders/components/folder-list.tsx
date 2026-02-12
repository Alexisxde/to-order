import FolderCard from "./folder-card"
import { useFolders } from "./hooks/use-folders"

export default function FolderList() {
	const { folders, folderId } = useFolders()

	return (
		<>
			{folders.filter((folder) => folder.rootId === folderId && folder.delete === false).map((folder) => (
				<FolderCard key={folder._id} folder={folder} />
			))}
		</>
	)
}
