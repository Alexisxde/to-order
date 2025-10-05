import CardFolder from "@/components/folders/card-folder"
import DeleteFolder from "@/components/folders/delete-folder"
import RenameFolder from "@/components/folders/rename-folder"
import { useFolder, useFolderActions } from "@/hooks/useFolder"

export default function ListFolder() {
	const { folders } = useFolder()
	const { actionType } = useFolderActions()

	return (
		<>
			{folders?.map(folder => (
				<CardFolder key={folder._id} folder={folder} />
			))}
			{/* {actionType === "archive" && <DeleteFolder isOpen={isOpen} setIsOpen={closeAction} />} */}
			{/* {actionType === "move" && <DeleteFolder isOpen={isOpen} setIsOpen={closeAction} />} */}
			{actionType === "rename" && <RenameFolder />}
			{actionType === "delete" && <DeleteFolder />}
		</>
	)
}
