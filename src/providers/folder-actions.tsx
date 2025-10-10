import { useFolder } from "@/hooks/useFolder"
import { Folder } from "@/types"
import { createContext, useState } from "react"

export type ActionType = "move" | "rename" | "archive" | "delete" | null

export type FolderActionsContextType = {
	folder: Folder | null
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	actionType: ActionType
	handleSetActionType: (type: ActionType, folder: Folder) => void
	handleRenameFolder: (name: string) => Promise<void>
	handleMoveFolder: () => Promise<void>
	handleDeleteFolder: () => Promise<void>
}

export const FolderActionsContext = createContext<FolderActionsContextType | null>(null)

export function FolderActionsProvider({ children }: { children: React.ReactNode }) {
	const [isOpen, setIsOpen] = useState(false)
	const [folder, setFolder] = useState<Folder | null>(null)
	const [actionType, setActionType] = useState<ActionType>(null)
	const { renameFolder, deleteFolder } = useFolder()

	const handleSetActionType = (type: ActionType, folder: Folder) => {
		setIsOpen(true)
		setActionType(type)
		setFolder(folder)
	}

	const closeAction = () => {
		setIsOpen(true)
		setActionType(null)
		setFolder(null)
	}

	const handleDeleteFolder = async () => {
		if (!folder?._id) return
		await deleteFolder(folder?._id)
		closeAction()
	}

	const handleRenameFolder = async (name: string) => {
		if (!folder?._id) return
		await renameFolder(folder?._id, name)
		closeAction()
	}

	const handleMoveFolder = async () => {
		if (!folder?._id) return
		// await renameFolder(folder?._id)
		closeAction()
	}

	return (
		<FolderActionsContext.Provider
			value={{
				folder,
				isOpen,
				setIsOpen,
				actionType,
				handleSetActionType,
				handleRenameFolder,
				handleDeleteFolder,
				handleMoveFolder
			}}>
			{children}
		</FolderActionsContext.Provider>
	)
}
