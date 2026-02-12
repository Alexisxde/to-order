"use client"

import { useToast } from "@/components/ui/toast"
import { useUser } from "@/hooks/use-user"
import type { Folder, Note } from "@/types"
import { createClient } from "@/supabase/client"
import { useState, useEffect } from "react"

export function useFolder() {
	const [isLoading, setIsLoading] = useState(false)
	const [allFolders, setAllFolders] = useState<Folder[] | null>(null)
	const [allNotes, setAllNotes] = useState<Note[] | null>(null)
	const [folders, setFolders] = useState<Folder[] | null>(null)
	const [notes, setNotes] = useState<Note[] | null>(null)
	const [folderId, setFolderId] = useState<string | null>(null)
	const [history, setHistory] = useState<{ _id: string | null; name: string; id_root: string | null }[]>([
		{ _id: null, name: "Inicio", id_root: null }
	])
	const { toast } = useToast()
	const supabase = createClient()
	const { data: user } = useUser()

	const getFolders = async () => {
		if (!user?.id) return

		setIsLoading(true)
		try {
			const { data: dataFolders } = await supabase
				.from("folders")
				.select("*")
				.eq("id_user", user.id)
				.eq("delete", false)

			const { data: dataNotes } = await supabase.from("notes").select("*").eq("id_user", user.id)

			setAllFolders(dataFolders as Folder[])
			setAllNotes(dataNotes as Note[])

			const rootFolders = (dataFolders as Folder[])
				?.filter((folder) => folder.id_root === null)
				.sort((a, b) => a.name.localeCompare(b.name))

			const rootNotes = (dataNotes as Note[])
				?.filter((note) => note.id_folder === null)
				.sort((a, b) => a.name.localeCompare(b.name))

			setFolders(rootFolders ?? [])
			setNotes(rootNotes ?? [])
		} catch (error) {
			toast.error({ text: "Error al cargar los datos" })
		} finally {
			setIsLoading(false)
		}
	}

	const getFolderId = async (_id: string | null) => {
		if (!allFolders || !allNotes) return

		setIsLoading(true)
		try {
			const filteredFolders = allFolders
				?.filter((folder) => folder.id_root === _id)
				.sort((a, b) => a.name.localeCompare(b.name))

			const filteredNotes = allNotes
				?.filter((note) => note.id_folder === _id)
				.sort((a, b) => a.name.localeCompare(b.name))

			setFolders(filteredFolders ?? [])
			setNotes(filteredNotes ?? [])

			const active = allFolders?.find((folder) => folder._id === _id)
			setHistory((prev) => {
				const idx = prev.findIndex((item) => item._id === _id)
				if (idx !== -1) return prev.slice(0, idx + 1)
				return active ? [...prev, active] : prev
			})
			setFolderId(_id)
		} catch (error) {
			toast.error({ text: "Error al cargar la carpeta" })
		} finally {
			setIsLoading(false)
		}
	}

	const createFolder = async (_id: string | null, { name }: { name: string }) => {
		if (!user?.id) return

		try {
			const exists = allFolders?.some((folder) => folder.id_root === _id && folder.name === name)
			if (exists) {
				toast.error({ text: "Ya existe una carpeta con ese nombre en esta ubicación." })
				return
			}

			const { data, error } = await supabase.from("folders").insert({ name, id_root: _id, id_user: user.id }).select()

			if (!data || error) throw new Error("Error al crear la carpeta.")

			toast.success({ text: `Carpeta ${name} creada correctamente.` })

			if (_id === folderId) {
				setFolders((prev) => (prev ? [...prev, data[0]] : [data[0]]))
			}
			setAllFolders((prev) => (prev ? [...prev, data[0]] : [data[0]]))
		} catch (error) {
			toast.error({ text: error instanceof Error ? error.message : "Ha ocurrido un error" })
		}
	}

	const createNote = async ({ name, content }: { name: string; content: unknown }) => {
		if (!user?.id) return

		try {
			const { data } = await supabase
				.from("notes")
				.insert({ name, content, id_folder: folderId, id_user: user.id })
				.select()

			if (!data) throw new Error("Error al crear la nota.")

			if (data[0]) {
				const newNote = data[0]
				toast.success({ text: `${name} creada correctamente.` })
				setAllNotes((prev) => (prev ? [...prev, newNote] : [newNote]))
				setNotes((prev) => (prev ? [...prev, newNote] : [newNote]))
			}
		} catch (error) {
			toast.error({ text: error instanceof Error ? error.message : "Ha ocurrido un error" })
		}
	}

	const updateNote = async ({ _id, content }: { _id: string; content: unknown }) => {
		const currentNote = notes?.find((note) => note._id === _id)
		if (currentNote && JSON.stringify(currentNote.content) === JSON.stringify(content)) return

		const update_at = new Date().toISOString()

		try {
			const { data } = await supabase.from("notes").update({ content, update_at }).eq("_id", _id).select()

			if (!data) throw new Error("Error al actualizar la nota.")

			if (data[0]) {
				const updatedNote = data[0]
				toast.success({ text: `${updatedNote.name} guardada correctamente.` })
				setNotes((prev) => prev?.map((note) => (note._id === _id ? { ...note, ...updatedNote } : note)) ?? prev)
				setAllNotes((prev) => prev?.map((note) => (note._id === _id ? { ...note, ...updatedNote } : note)) ?? prev)
			}
		} catch (error) {
			toast.error({ text: error instanceof Error ? error.message : "Ha ocurrido un error" })
		}
	}

	const deleteFolder = async (id: string) => {
		try {
			const { data } = await supabase.from("folders").update({ delete: true }).eq("_id", id).select()

			if (!data) throw new Error("Error al eliminar la carpeta.")

			if (data[0]) {
				const deletedFolder = data[0]
				toast.success({ text: `Carpeta ${deletedFolder.name} eliminada.` })
				setFolders((prev) => prev?.filter((folder) => folder._id !== id) ?? prev)
				setAllFolders((prev) => prev?.filter((folder) => folder._id !== id) ?? prev)
			}
		} catch (error) {
			toast.error({ text: error instanceof Error ? error.message : "Ha ocurrido un error" })
		}
	}

	const renameFolder = async (id: string, name: string) => {
		const currentFolder = folders?.find((folder) => folder._id === id)
		if (currentFolder && name === currentFolder.name) return

		try {
			const { data } = await supabase.from("folders").update({ name }).eq("_id", id).select()

			if (!data) throw new Error("Error al renombrar la carpeta.")

			if (data[0]) {
				toast.success({ text: `Carpeta renombrada a ${name}.` })
				setFolders((prev) => prev?.map((folder) => (folder._id === id ? { ...folder, name } : folder)) ?? prev)
				setAllFolders((prev) => prev?.map((folder) => (folder._id === id ? { ...folder, name } : folder)) ?? prev)
			}
		} catch (error) {
			toast.error({ text: error instanceof Error ? error.message : "Ha ocurrido un error" })
		}
	}

	const moveFolder = async (_id: string, folder_id: string | null) => {
		try {
			const { data } = await supabase.from("folders").update({ id_root: folder_id }).eq("_id", _id).select()

			if (!data) throw new Error("Error al mover la carpeta. Inténtelo de nuevo.")

			if (data[0]) {
				toast.success({ text: `La carpeta se ha movido correctamente.` })
				setFolders((prev) => prev?.filter((folder) => folder._id !== _id) ?? prev)
				setAllFolders(
					(prev) => prev?.map((folder) => (folder._id === _id ? { ...folder, id_root: folder_id } : folder)) ?? prev
				)
			}
		} catch (error) {
			toast.error({ text: error instanceof Error ? error.message : "Ha ocurrido un error" })
		}
	}

	useEffect(() => {
		if (user?.id) {
			getFolders()
		}
	}, [user?.id])

	return {
		loading: isLoading,
		folderId,
		setFolderId: getFolderId,
		createFolder,
		moveFolder,
		renameFolder,
		deleteFolder,
		createNote,
		updateNote,
		history,
		allNotes,
		allFolders,
		folders,
		notes,
		getFolderId,
		isLoading
	}
}
