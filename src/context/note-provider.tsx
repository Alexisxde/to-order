"use client"
import { useFolders } from "@/app/app/folders/components/hooks/use-folders"
import { useUser } from "@/hooks/use-user"
import { NOTES } from "@/lib/query-keys"
import NoteService from "@/module/notes/note.service"
import type { CreateNoteDto, Note, UpdateNoteDto } from "@/module/notes/note.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext } from "react"
import { toast } from "sonner"

export type NotesContextType = {
	isLoading: boolean
	isError: boolean
	notes: Note[] | []
	create: ({ name, folderId }: CreateNoteDto) => void
	update: ({ id, name, content }: UpdateNoteDto) => void
}

export const NoteContext = createContext<NotesContextType | null>(null)

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = useQueryClient()
	const { data: user } = useUser()
	const { folderId } = useFolders()

	const { data, isLoading, isError } = useQuery({
		queryKey: [...NOTES, user?.id],
		queryFn: () => NoteService.select(user?.id),
		enabled: !!user,
		select: (data) => data.filter((note) => note.folderId === folderId)
	})

	const create = useMutation({
		mutationFn: ({ name, folderId }: CreateNoteDto) => NoteService.create({ name, folderId }, user?.id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...NOTES, user?.id] })
			toast.success("Nota creada correctamente.")
		}
	})

	const update = useMutation({
		mutationFn: ({ id, name, content }: UpdateNoteDto) =>
			NoteService.update({ id, name, content, updateAt: new Date().toISOString() }),
		onMutate: ({ id, name }: UpdateNoteDto) => {
			const previousNotes = queryClient.getQueryData<Note[]>([...NOTES, user?.id])
			if (previousNotes) {
				const updatedNotes = previousNotes.map((note) => {
					if (note._id === id) return { ...note, name, updateAt: new Date().toISOString() }
					return note
				})
				queryClient.setQueryData<Note[]>([...NOTES, user?.id], updatedNotes)
			}
			return { previousNotes }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousNotes) queryClient.setQueryData<Note[]>([...NOTES, user?.id], context.previousNotes)
			toast.error("Error al actualizar la nota.")
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...NOTES, user?.id] })
			toast.success("Nota actualizada correctamente.")
		}
	})

	// const deleted = useMutation({
	// 	mutationFn: (id: string) => FolderService.deleted(id),
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries({ queryKey: [...FOLDERS, user?.id] })
	// 		toast.success({ text: "Carpeta eliminada." })
	// 	}
	// })

	// const move = useMutation({
	// 	mutationFn: ({ _id, folder_id }: { _id: string; folder_id: string | null }) => FolderService.move(_id, folder_id),
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries({ queryKey: [...FOLDERS, user?.id] })
	// 		toast.success({ text: "Carpeta movida correctamente." })
	// 	}
	// })

	return (
		<NoteContext.Provider
			value={{
				isLoading,
				isError,
				notes: data || [],
				create: ({ name, folderId }) => create.mutate({ name, folderId }),
				update: ({ id, name, content }) => update.mutate({ id, name, content })
			}}>
			{children}
		</NoteContext.Provider>
	)
}
