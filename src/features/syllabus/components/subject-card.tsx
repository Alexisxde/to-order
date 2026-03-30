"use client"
import type { Subject } from "../syllabus.type"
import useUpdateSubject from "../hooks/use-update-subject"
import useDeleteSubject from "../hooks/use-delete-subject"
import { SubjectCardView } from "./subject-card-view"

interface SubjectCardProps {
	subject: Subject
	onClick: () => void
}

export function SubjectCard({ subject, onClick }: SubjectCardProps) {
	const { mutate: updateSubject } = useUpdateSubject()
	const { mutate: deleteSubject } = useDeleteSubject()

	const handleUpdate = (name: string) => {
		updateSubject({ subjectId: subject.id, name })
	}

	const handleDelete = () => {
		deleteSubject(subject.id)
	}

	return <SubjectCardView subject={subject} onClick={onClick} onUpdate={handleUpdate} onDelete={handleDelete} />
}
