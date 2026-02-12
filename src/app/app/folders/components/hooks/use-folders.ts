"use client"
import { FolderContext } from "@/context/folder-provider"
import { useUser } from "@/hooks/use-user"
import { FOLDERS_DELETED } from "@/lib/query-keys"
import FolderService from "@/module/folders/folder.service"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"

export function useFolders() {
	const context = useContext(FolderContext)
	if (!context) throw new Error("useFolders must be used within a FoldersProvider")
	return context
}

export function useFoldersDeleted() {
	const { data: user } = useUser()

	return useQuery({
		queryKey: [...FOLDERS_DELETED, user?.id],
		queryFn: () => FolderService.select(user?.id),
		enabled: !!user,
		select: (data) => data.filter((folder) => folder.delete === true)
	})
}
