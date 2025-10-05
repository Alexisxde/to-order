import { FolderActionsContext } from "@/providers/folder-actions"
import { FolderContext } from "@/providers/folder-provider"
import { useContext } from "react"

export const useFolder = () => {
	const context = useContext(FolderContext)
	if (!context) throw new Error("useFolder must be used within a FolderProvider")
	return context
}

export const useFolderActions = () => {
	const context = useContext(FolderActionsContext)
	if (!context) throw new Error("useFolderActions must be used within a FolderActionsProvider")
	return context
}
