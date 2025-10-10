import CardFolder from "@/components/folders/card-folder"
import DeleteFolder from "@/components/folders/delete-folder"
import RenameFolder from "@/components/folders/rename-folder"
import { useFolder, useFolderActions } from "@/hooks/useFolder"
import MoveFolder from "./move-folder"

export default function ListFolder() {
	const { folders } = useFolder()
	const { actionType } = useFolderActions()

	return (
		<>
			{folders?.map(folder => (
				<CardFolder key={folder._id} folder={folder} />
			))}
			{actionType === "move" && <MoveFolder />}
			{actionType === "rename" && <RenameFolder />}
			{actionType === "delete" && <DeleteFolder />}
		</>
	)
}
