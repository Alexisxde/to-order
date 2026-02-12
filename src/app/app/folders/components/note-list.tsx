import { useNotes } from "./hooks/use-notes"
import NoteCard from "./note-card"

export default function NoteList() {
	const { notes } = useNotes()

	return (
		<>
			{notes.map((note) => (
				<NoteCard key={note._id} note={note} />
			))}
		</>
	)
}
