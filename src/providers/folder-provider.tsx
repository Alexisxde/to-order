"use client"
import { createClient } from "@/supabase/client"
import type { Folder, Note } from "@/types"
import { createContext, useContext, useEffect, useState } from "react"

export type FolderContextType = {
	history: { _id: string; name: string; id_root: string | null }[] | []
	folders: Folder[] | null
	notes: Note[] | null
	getFolderId: (_id: string | null) => Promise<void>
}

const FolderContext = createContext<FolderContextType | null>(null)

interface FolderProviderProps {
	children: React.ReactNode
}

export const FoldersProvider = ({ children }: FolderProviderProps) => {
	const supabase = createClient()
	const [allFolders, allSetFolders] = useState<Folder[] | null>(null)
	const [allNotes, allSetNotes] = useState<Note[] | null>(null)
	const [folders, setFolders] = useState<Folder[] | null>(null)
	const [notes, setNotes] = useState<Note[] | null>(null)
	const [history, setHistory] = useState<
		{ _id: null; name: string; id_root: string | null }[] | []
	>([])

	const getFolders = async () => {
		const {
			data: { user }
		} = await supabase.auth.getUser()

		const { data: dataFolders } = await supabase
			.from("folders")
			.select("*")
			.eq("id_user", user?.id)

		const { data: dataNotes } = await supabase
			.from("notes")
			.select("*")
			.eq("id_user", user?.id)

		allSetFolders(dataFolders as Folder[])
		allSetNotes(dataNotes as Note[])
		const rootFolders = (dataFolders as Folder[])?.filter(
			folder => folder.id_root === null
		)
		const rootNotes = (dataNotes as Note[])?.filter(
			note => note.id_folder === null
		)
		setFolders(rootFolders ?? [])
		setNotes(rootNotes ?? [])
		setHistory([{ _id: null, name: "Inicio", id_root: null }])
	}

	const getFolderId = async (_id: string | null) => {
		const rootFolders = allFolders?.filter(folder => folder.id_root === _id)
		const rootNotes = allNotes?.filter(note => note.id_folder === _id)
		setFolders(rootFolders ?? [])
		setNotes(rootNotes ?? [])
		const active = allFolders?.find(folder => folder._id === _id)
		setHistory(prev => {
			const idx = prev.findIndex(item => item._id === _id)
			if (idx !== -1) return prev.slice(0, idx + 1)
			return [...prev, active]
		})
	}

	useEffect(() => {
		getFolders()
	}, [])

	return (
		<FolderContext.Provider value={{ history, folders, notes, getFolderId }}>
			{children}
		</FolderContext.Provider>
	)
}

export const useFolder = () => {
	const context = useContext(FolderContext)
	if (!context)
		throw new Error("useFolder must be used within a FolderProvider")
	return context
}
