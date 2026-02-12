"use client"
import { useUser } from "@/hooks/use-user"
import { FOLDERS } from "@/lib/query-keys"
import FolderService from "@/module/folders/folder.service"
import type {
	CreateFolderDto,
	DeleteFolderDto,
	Folder,
	MoveFolderDto,
	UpdateFolderDto
} from "@/module/folders/folder.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, useState } from "react"
import { toast } from "sonner"

export type FolderContextType = {
	history: History[]
	isLoading: boolean
	isError: boolean
	folders: Folder[] | []
	folderId: string | null
	changeFolder: (folder: History) => void
	backFolder: () => void
	create: ({ name, rootId }: CreateFolderDto) => void
	update: ({ id, name }: UpdateFolderDto) => void
	deleted: ({ id, deleted }: DeleteFolderDto) => void
	move: ({ id, rootId }: MoveFolderDto) => void
}

type History = { _id: string | null; name: string; rootId: string | null }

export const FolderContext = createContext<FolderContextType | null>(null)

export function FoldersProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient()
	const [history, setHistory] = useState<History[]>([{ _id: null, name: "Inicio", rootId: null }])
	const [folderId, setFolderId] = useState<string | null>(null)
	const { data: user } = useUser()

	const { data, isLoading, isError } = useQuery({
		queryKey: [...FOLDERS, user?.id],
		queryFn: () => FolderService.select(user?.id),
		enabled: !!user
	})

	const changeFolder = ({ _id, name, rootId }: History) => {
		setFolderId(_id)
		setHistory((prev) => {
			const exists = prev.findIndex((item) => item._id === _id)
			if (exists !== -1) {
				return prev.slice(0, exists + 1)
			}
			return [...prev, { _id, name, rootId }]
		})
	}

	const backFolder = () => {
		const previousFolder = history[history.length - 2]
		if (previousFolder) setFolderId(previousFolder._id)
		setHistory((prev) => prev.slice(0, -1) ?? null)
	}

	const create = useMutation({
		mutationFn: ({ name, rootId }: CreateFolderDto) => FolderService.create({ name, rootId }, user?.id),
		onMutate: ({ name, rootId }) => {
			const previousFolders = queryClient.getQueryData<Folder[]>([...FOLDERS, user?.id])
			const newFolder: Folder = {
				_id: Math.random().toString(36).substring(2, 9),
				name,
				rootId,
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

	const update = useMutation({
		mutationFn: ({ id, name }: UpdateFolderDto) => FolderService.update({ id, name }),
		onMutate: ({ id, name }: UpdateFolderDto) => {
			const previousFolders = queryClient.getQueryData<Folder[]>([...FOLDERS, user?.id])
			if (previousFolders) {
				const updatedFolders = previousFolders.map((folder) => {
					if (folder._id === id) return { ...folder, name }
					return folder
				})
				queryClient.setQueryData<Folder[]>([...FOLDERS, user?.id], updatedFolders)
			}
			return { previousFolders }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousFolders) queryClient.setQueryData<Folder[]>([...FOLDERS, user?.id], context.previousFolders)
			toast.error("Error al actualizar la carpeta.")
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...FOLDERS, user?.id] })
			toast.success("Carpeta actualizada correctamente.")
		}
	})

	const deleted = useMutation({
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

	const move = useMutation({
		mutationFn: ({ id, rootId }: MoveFolderDto) => FolderService.move({ id, rootId }),
		onMutate: ({ id, rootId }: MoveFolderDto) => {
			const previousFolders = queryClient.getQueryData<Folder[]>([...FOLDERS, user?.id])
			if (previousFolders) {
				const updatedFolders = previousFolders.map((folder) => {
					if (folder._id === id) return { ...folder, rootId }
					return folder
				})
				queryClient.setQueryData<Folder[]>([...FOLDERS, user?.id], updatedFolders)
			}
			return { previousFolders }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousFolders) queryClient.setQueryData<Folder[]>([...FOLDERS, user?.id], context.previousFolders)
			toast.error("Error al mover la carpeta.")
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...FOLDERS, user?.id] })
			toast.success("Carpeta movida correctamente.")
		}
	})

	return (
		<FolderContext.Provider
			value={{
				history,
				folderId,
				isLoading,
				isError,
				folders: data || [],
				backFolder,
				changeFolder,
				create: ({ name, rootId }) => create.mutate({ name, rootId }),
				update: ({ id, name }) => update.mutate({ id, name }),
				deleted: ({ id, deleted: d }) => deleted.mutate({ id, deleted: d }),
				move: ({ id, rootId }) => move.mutate({ id, rootId })
			}}>
			{children}
		</FolderContext.Provider>
	)
}
