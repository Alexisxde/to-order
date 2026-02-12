"use client"
import { NoteContext } from "@/context/note-provider"
import { useContext } from "react"

export function useNotes() {
	const context = useContext(NoteContext)
	if (!context) throw new Error("useNotes must be used within a NotesProvider")
	return context
}
