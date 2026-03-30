"use client"
import type { Subtopic } from "../syllabus.type"
import useUpdateSubtopic from "../hooks/use-update-subtopic"
import useDeleteSubtopic from "../hooks/use-delete-subtopic"
import { SubtopicItemView } from "./subtopic-item-view"

interface SubtopicItemProps {
	subtopic: Subtopic
	subjectId: string
}

export function SubtopicItem({ subtopic, subjectId }: SubtopicItemProps) {
	const { mutate: updateSubtopic } = useUpdateSubtopic(subjectId)
	const { mutate: deleteSubtopic } = useDeleteSubtopic(subjectId)

	const handleToggle = (completed: boolean) => {
		updateSubtopic({ subtopicId: subtopic.id, subtopic: { completed } })
	}

	const handleUpdate = (name: string) => {
		updateSubtopic({ subtopicId: subtopic.id, subtopic: { name } })
	}

	const handleDelete = () => {
		deleteSubtopic(subtopic.id)
	}

	return (
		<SubtopicItemView subtopic={subtopic} onToggle={handleToggle} onUpdate={handleUpdate} onDelete={handleDelete} />
	)
}
