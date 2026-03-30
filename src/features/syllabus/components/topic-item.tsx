"use client"
import type { TopicWithSubtopics } from "../syllabus.type"
import useUpdateTopic from "../hooks/use-update-topic"
import useDeleteTopic from "../hooks/use-delete-topic"
import { TopicItemView } from "./topic-item-view"
import { SubtopicItem } from "./subtopic-item"

interface TopicItemProps {
	topic: TopicWithSubtopics
	subjectId: string
	onAddSubtopic: (topicId: string) => void
}

export function TopicItem({ topic, subjectId, onAddSubtopic }: TopicItemProps) {
	const { mutate: updateTopic } = useUpdateTopic(subjectId)
	const { mutate: deleteTopic } = useDeleteTopic(subjectId)

	const handleUpdate = (name: string) => {
		updateTopic({ topicId: topic.id, topic: { name } })
	}

	const handleDelete = () => {
		deleteTopic(topic.id)
	}

	return (
		<TopicItemView
			topic={topic}
			onUpdate={handleUpdate}
			onDelete={handleDelete}
			onAddSubtopic={() => onAddSubtopic(topic.id)}>
			{topic.subtopics.map((subtopic) => (
				<SubtopicItem key={subtopic.id} subtopic={subtopic} subjectId={subjectId} />
			))}
		</TopicItemView>
	)
}
