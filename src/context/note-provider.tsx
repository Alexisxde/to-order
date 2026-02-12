"use client"
import { useFolders } from "@/app/app/folders/components/hooks/use-folders"
import { useUser } from "@/hooks/use-user"
import { NOTES } from "@/lib/query-keys"
import NoteService from "@/module/notes/note.service"
import type { CreateNoteDto, Note, UpdateNoteDto, DeleteNoteDto, MoveNoteDto } from "@/module/notes/note.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext } from "react"
import { toast } from "sonner"

export type NotesContextType = {
	isLoading: boolean
	isError: boolean
	notes: Note[] | []
	create: ({ name, folderId }: CreateNoteDto) => void
	update: ({ id, name, content }: UpdateNoteDto) => void
	deleted: ({ id, deleted }: DeleteNoteDto) => void
	move: ({ id, folderId }: MoveNoteDto) => void
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
		select: (data) => data.filter((note) => note.folderId === folderId && note.deleted === false)
	})

	const create = useMutation({
		mutationFn: ({ name, folderId }: CreateNoteDto) => NoteService.create({ name, folderId }, user?.id),
		onMutate: ({ name, folderId }) => {
			const previousNotes = queryClient.getQueryData<Note[]>([...NOTES, user?.id])
			const newNote: Note = {
				_id: Math.random().toString(36).substring(2, 9),
				name,
				folderId,
				createdAt: new Date().toISOString()
			}
			if (previousNotes) queryClient.setQueryData<Note[]>([...NOTES, user?.id], [...previousNotes, newNote])
			return { previousNotes }
		},
		onError: (_error, _variables, context) => {
			console.log(_error)
			if (context?.previousNotes) queryClient.setQueryData<Note[]>([...NOTES, user?.id], context.previousNotes)
			toast.error("Error al crear la nota.")
		},
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

	const deleted = useMutation({
		mutationFn: ({ id, deleted }: DeleteNoteDto) => NoteService.deleted({ id, deleted }),
		onMutate: ({ id, deleted }: DeleteNoteDto) => {
			const previousNotes = queryClient.getQueryData<Note[]>([...NOTES, user?.id])
			if (previousNotes) {
				const updatedNotes = previousNotes.map((note) => {
					if (note._id === id) return { ...note, deleted: deleted ?? true }
					return note
				})
				queryClient.setQueryData<Note[]>([...NOTES, user?.id], updatedNotes)
			}
			return { previousNotes }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousNotes) queryClient.setQueryData<Note[]>([...NOTES, user?.id], context.previousNotes)
			toast.error("Error al eliminar la nota.")
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...NOTES, user?.id] })
			toast.success("Nota enviada a la papelera correctamente.")
		}
	})

	const move = useMutation({
		mutationFn: ({ id, folderId }: MoveNoteDto) => NoteService.move({ id, folderId }),
		onMutate: ({ id, folderId }: MoveNoteDto) => {
			const previousNotes = queryClient.getQueryData<Note[]>([...NOTES, user?.id])
			if (previousNotes) {
				const updatedNotes = previousNotes.map((note) => {
					if (note._id === id) return { ...note, folderId }
					return note
				})
				queryClient.setQueryData<Note[]>([...NOTES, user?.id], updatedNotes)
			}
			return { previousNotes }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousNotes) queryClient.setQueryData<Note[]>([...NOTES, user?.id], context.previousNotes)
			toast.error("Error al mover la nota.")
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...NOTES, user?.id] })
			toast.success("Nota movida correctamente.")
		}
	})

	return (
		<NoteContext.Provider
			value={{
				isLoading,
				isError,
				notes: data || [],
				create: ({ name, folderId }) => create.mutate({ name, folderId }),
				update: ({ id, name, content }) => update.mutate({ id, name, content }),
				deleted: ({ id, deleted }) => update.mutate({ id, deleted }),
				move: ({ id, folderId }) => update.mutate({ id, folderId })
			}}>
			{children}
		</NoteContext.Provider>
	)
}
