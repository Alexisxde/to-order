"use client"
import { useToast } from "@/components/ui/toast"
import { createClient } from "@/supabase/client"
import type { Folder, Note } from "@/types"
import { createContext, useEffect, useState } from "react"

export type FolderContextType = {
	loading: boolean
	history: { _id: string; name: string; id_root: string | null }[]
	folders: Folder[] | null
	notes: Note[] | null
	folderId: string | null
	setFolderId: React.Dispatch<React.SetStateAction<string | null>>
	getFolderId: (_id: string | null) => Promise<void>
	createFolder: (_id: string | null, { name }: { name: string }) => Promise<void>
	createNote: ({ name, content }: { name: string; content: unknown }) => Promise<void>
	updateNote: ({ _id, name, content }: { _id: string; name: string; content: unknown }) => Promise<void>
}

export const FolderContext = createContext<FolderContextType | null>(null)

interface FolderProviderProps {
	children: React.ReactNode
}

export const FoldersProvider = ({ children }: FolderProviderProps) => {
	const supabase = createClient()
	const [isLoading, setIsLoading] = useState(false)
	const [allFolders, allSetFolders] = useState<Folder[] | null>(null)
	const [allNotes, allSetNotes] = useState<Note[] | null>(null)
	const [folders, setFolders] = useState<Folder[] | null>(null)
	const [notes, setNotes] = useState<Note[] | null>(null)
	const [folderId, setFolderId] = useState<string | null>(null)
	const { toast } = useToast()

	const [history, setHistory] = useState<{ _id: string | null; name: string; id_root: string | null }[]>([
		{ _id: null, name: "Inicio", id_root: null }
	])

	const getFolders = async () => {
		setIsLoading(true)
		const {
			data: { user }
		} = await supabase.auth.getUser()

		const { data: dataFolders } = await supabase.from("folders").select("*").eq("id_user", user?.id)
		const { data: dataNotes } = await supabase.from("notes").select("*").eq("id_user", user?.id)

		allSetFolders(dataFolders as Folder[])
		allSetNotes(dataNotes as Note[])
		const rootFolders = (dataFolders as Folder[])
			?.filter(folder => folder.id_root === null)
			.sort((a, b) => a.name.localeCompare(b.name))
		const rootNotes = (dataNotes as Note[])
			?.filter(note => note.id_folder === null)
			.sort((a, b) => a.name.localeCompare(b.name))
		setFolders(rootFolders ?? [])
		setNotes(rootNotes ?? [])
		setIsLoading(false)
	}

	const getFolderId = async (_id: string | null) => {
		setIsLoading(true)
		const rootFolders = allFolders
			?.filter(folder => folder.id_root === _id)
			.sort((a, b) => a.name.localeCompare(b.name))
		const rootNotes = allNotes?.filter(note => note.id_folder === _id).sort((a, b) => a.name.localeCompare(b.name))
		setFolders(rootFolders ?? [])
		setNotes(rootNotes ?? [])
		const active = allFolders?.find(folder => folder._id === _id)
		setHistory(prev => {
			const idx = prev.findIndex(item => item._id === _id)
			if (idx !== -1) return prev.slice(0, idx + 1)
			return active ? [...prev, active] : prev
		})
		setIsLoading(false)
	}

	const createFolder = async (_id: string | null, { name }: { name: string }) => {
		try {
			const {
				data: { user }
			} = await supabase.auth.getUser()
			const exists = allFolders?.some(folder => folder.id_root === _id && folder.name === name)
			if (exists) {
				toast.error({
					text: "Ya existe una carpeta con ese nombre en esta ubicación."
				})
				return
			}

			const { data, error } = await supabase.from("folders").insert({ name, id_root: _id, id_user: user?.id }).select()
			if (!data) throw new Error("Error al crear la carpeta.")
			if (!error) toast.success({ text: `Carpeta ${name} creada correctamente.` })
			if (_id === folderId) setFolders(p => (p ? [...p, data[0]] : [data[0]]))
			allSetFolders(p => (p ? [...p, data[0]] : [data[0]]))
		} catch (error) {
			toast.error({
				text: error instanceof Error ? error.message : "A ocurrido un error"
			})
		}
	}

	const createNote = async ({ name, content }: { name: string; content: unknown }) => {
		try {
			const {
				data: { user }
			} = await supabase.auth.getUser()

			const { data, error } = await supabase
				.from("notes")
				.insert({ name, content, id_folder: folderId, id_user: user?.id })
				.select()
			if (!data) throw new Error("Error al crear la nota.")
			if (!error) toast.success({ text: `${name} creada correctamente.` })
			if (data?.[0]?.id_folder === folderId) setNotes(p => (p ? [...p, data[0]] : [data[0]]))
			allSetNotes(p => (p ? [...p, data[0]] : [data[0]]))
		} catch (error) {
			toast.error({
				text: error instanceof Error ? error.message : "A ocurrido un error"
			})
		}
	}

	const updateNote = async ({ _id, name, content }: { _id: string; name: string; content: unknown }) => {
		try {
			const { data, error } = await supabase.from("notes").update({ name, content }).eq("_id", _id).select()
			if (!data) throw new Error("Error al actualizar la nota.")
			if (!error) toast.success({ text: `${name} guardada correctamente.` })
			if (data?.[0]) {
				const updatedNote = data[0]
				setNotes(prev =>
					prev
						? prev.map(note =>
								note._id === _id
									? {
											...note,
											name: updatedNote.name,
											content: updatedNote.content
										}
									: note
							)
						: prev
				)
				allSetNotes(prev =>
					prev
						? prev.map(note =>
								note._id === _id
									? {
											...note,
											name: updatedNote.name,
											content: updatedNote.content
										}
									: note
							)
						: prev
				)
			}
		} catch (error) {
			toast.error({
				text: error instanceof Error ? error.message : "A ocurrido un error"
			})
		}
	}

	useEffect(() => {
		getFolders()
	}, [])

	return (
		<FolderContext.Provider
			value={{
				loading: isLoading,
				folderId,
				setFolderId,
				createFolder,
				createNote,
				updateNote,
				history,
				folders,
				notes,
				getFolderId
			}}>
			{children}
		</FolderContext.Provider>
	)
}
