"use client"
import { useUser } from "@/hooks/use-user"
import { FOLDERS } from "@/lib/query-keys"
import FolderService from "@/module/folders/folder.service"
import type { CreateFolderDto, Folder } from "@/module/folders/folder.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export default function useCreateFolder() {
	const queryClient = useQueryClient()
	const { data: user } = useUser()

	return useMutation({
		mutationFn: ({ name, rootId }: CreateFolderDto) => FolderService.create({ name, rootId }, user?.id),
		onMutate: ({ name, rootId }) => {
			const previousFolders = queryClient.getQueryData<Folder[]>([...FOLDERS, user?.id])
			const newFolder: Folder = {
				_id: Math.random().toString(36).substring(2, 9),
				name,
				rootId,
				fav: false,
				createdAt: new Date().toISOString(),
				delete: false
			}
			if (previousFolders) queryClient.setQueryData<Folder[]>([...FOLDERS, user?.id], [...previousFolders, newFolder])
			return { previousFolders }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousFolders) queryClient.setQueryData<Folder[]>([...FOLDERS, user?.id], context.previousFolders)
			toast.error("Error al crear la carpeta.")
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...FOLDERS, user?.id] })
			toast.success("Carpeta creada correctamente.")
		}
	})
}
