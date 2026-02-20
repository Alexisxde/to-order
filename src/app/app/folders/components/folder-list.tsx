import type { Folder } from "@/module/folders/folder.type"
import FolderCard from "./folder-card"

type Props = { folders: Folder[] }

export default function FolderList({ folders }: Props) {
	return (
		<>
			{folders.map((folder) => (
				<FolderCard key={folder._id} folder={folder} />
			))}
		</>
	)
}
