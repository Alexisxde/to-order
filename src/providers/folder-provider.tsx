"use client"
import { createClient } from "@/supabase/client"
import { createContext, useContext, useEffect, useState } from "react"

type Folder = {
	_id: string
	name: string
	created_at: string
	id_root: string | null
	id_user: string
}

export type FolderContextType = {
	folders: Folder[]
	getFolders: (_id: string | null) => Promise<void>
}

const FolderContext = createContext<FolderContextType | null>(null)

interface FolderProviderProps {
	children: React.ReactNode
}

export const FoldersProvider = ({ children }: FolderProviderProps) => {
	const supabase = createClient()
	const [folders, setFolders] = useState<Folder[] | []>([])

	const getFolders = async (_id: string | null = null) => {
		const {
			data: { user }
		} = await supabase.auth.getUser()

		let query = supabase.from("folders").select().eq("id_user", user?.id)

		if (_id === null) {
			query = query.is("id_root", null)
		} else {
			query = query.eq("id_root", _id)
		}

		const { data } = await query
		setFolders(data as Folder[])
	}

	// const createFolder = async ({
	// 	name,
	// 	description
	// }: {
	// 	name: string
	// 	description: string
	// }) => {
	// 	try {
	// 		const {
	// 			data: { user }
	// 		} = await supabase.auth.getUser()
	// 		const { data } = await supabase
	// 			.from("Folders")
	// 			.insert({ name, description, user_id: user?.id })
	// 			.select()
	// 		console.log(data)
	// 		if (!data) throw new Error("Error creating Folder")
	// 		setFolders(prev => [data[0], ...prev!])
	// 	} catch (error) {
	// 		setFolders(prev => prev)
	// 		console.error("Error updating Folder:", error)
	// 	}
	// }

	useEffect(() => {
		getFolders()
	}, [])

	return (
		<FolderContext.Provider value={{ folders, getFolders }}>
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
