import { FolderContext } from "@/providers/folder-provider"
import { useContext } from "react"

export const useFolder = () => {
	const context = useContext(FolderContext)
	if (!context) throw new Error("useFolder must be used within a FolderProvider")
	return context
}
