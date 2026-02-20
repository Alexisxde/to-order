"use client"
import { useUser } from "@/hooks/use-user"
import { NOTES } from "@/lib/query-keys"
import NoteService from "@/module/notes/note.service"
import type { CreateNoteDto, DeleteNoteDto, MoveNoteDto, Note, UpdateNoteDto } from "@/module/notes/note.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext } from "react"
import { toast } from "sonner"

export type NotesContextType = {
	isLoading: boolean
	isError: boolean
	notes: Note[] | []
	create: ({ name, folderId }: CreateNoteDto) => void
	update: ({ id, content }: UpdateNoteDto) => void
	deleted: ({ id, deleted }: DeleteNoteDto) => void
	move: ({ id, folderId }: MoveNoteDto) => void
}

export const NoteContext = createContext<NotesContextType | null>(null)

export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClient = useQueryClient()
	const { data: user } = useUser()

	const { data, isLoading, isError } = useQuery({
		queryKey: [...NOTES, user?.id],
		queryFn: () => NoteService.select(user?.id),
		enabled: !!user
	})

	const create = useMutation({
		mutationFn: ({ name, folderId }: CreateNoteDto) => NoteService.create({ name, folderId }, user?.id),
		onMutate: ({ name, folderId }) => {
			const previousNotes = queryClient.getQueryData<Note[]>([...NOTES, user?.id])
			const newNote = {
				_id: Math.random().toString(36).substring(2, 9),
				name,
				folderId,
				createdAt: new Date().toISOString(),
				fav: false,
				deleted: false,
				updateAt: new Date().toISOString()
			}
			if (previousNotes) queryClient.setQueryData<Note[]>([...NOTES, user?.id], [...previousNotes, newNote as Note])
			return { previousNotes }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousNotes) queryClient.setQueryData<Note[]>([...NOTES, user?.id], context.previousNotes)
			toast.error("Error al crear la nota.")
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...NOTES, user?.id] })
			toast.success("Nota creada correctamente.")
		}
	})

	const update = useMutation({
		mutationFn: ({ id, content }: UpdateNoteDto) =>
			NoteService.update({ id, content, updateAt: new Date().toISOString() }),
		onMutate: ({ id }: UpdateNoteDto) => {
			const previousNotes = queryClient.getQueryData<Note[]>([...NOTES, user?.id])
			if (previousNotes) {
				const updatedNotes = previousNotes.map((note) => {
					if (note._id === id) return { ...note, updateAt: new Date().toISOString() }
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

	const onDeleted = useMutation({
		mutationFn: ({ id, deleted }: DeleteNoteDto) => NoteService.deleted({ id, deleted }),
		onMutate: ({ id, deleted }: DeleteNoteDto) => {
			const previousNotes = queryClient.getQueryData<Note[]>([...NOTES, user?.id])
			if (previousNotes) {
				const updatedNotes = previousNotes.map((note) => {
					if (note._id === id) return { ...note, deleted }
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
				update: ({ id, content }) => update.mutate({ id, content }),
				deleted: ({ id, deleted }) => onDeleted.mutate({ id, deleted }),
				move: ({ id, folderId }) => move.mutate({ id, folderId })
			}}>
			{children}
		</NoteContext.Provider>
	)
}
