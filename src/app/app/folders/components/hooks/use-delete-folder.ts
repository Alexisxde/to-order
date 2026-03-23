"use client"
import { useUser } from "@/hooks/use-user"
import { FOLDERS } from "@/lib/query-keys"
import FolderService from "@/module/folders/folder.service"
import type { DeleteFolderDto, Folder } from "@/module/folders/folder.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export default function useDeleteFolder() {
	const queryClient = useQueryClient()
	const { data: user } = useUser()

	return useMutation({
		mutationFn: ({ id, deleted }: DeleteFolderDto) => FolderService.deleted({ id, deleted }),
		onMutate: ({ id, deleted: d }: DeleteFolderDto) => {
			const previousFolders = queryClient.getQueryData<Folder[]>([...FOLDERS, user?.id])
			if (previousFolders) {
				const updatedFolders = previousFolders.map((folder) => {
					if (folder._id === id) return { ...folder, delete: d ?? true }
					return folder
				})
				queryClient.setQueryData<Folder[]>([...FOLDERS, user?.id], updatedFolders)
			}
			return { previousFolders }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousFolders) queryClient.setQueryData<Folder[]>([...FOLDERS, user?.id], context.previousFolders)
			toast.error("Error al eliminar la carpeta.")
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...FOLDERS, user?.id] })
			toast.success("Carpeta enviada a la papelera correctamente.")
		}
	})
}
