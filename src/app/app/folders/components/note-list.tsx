import type { Note } from "@/module/notes/note.type"
import NoteCard from "./note-card"

type Props = { notes: Note[] }

export default function NoteList({ notes }: Props) {
	return (
		<>
			{notes.map((note) => (
				<NoteCard key={note._id} note={note} />
			))}
		</>
	)
}
