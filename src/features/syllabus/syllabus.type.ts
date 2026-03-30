export type Subject = {
	id: string
	name: string
	createdAt: string
}

export type Topic = {
	id: string
	name: string
	subjectId: string
	createdAt: string
}

export type Subtopic = {
	id: string
	name: string
	completed: boolean
	createdAt: string
	topicId: string
}

export type TopicWithSubtopics = Topic & {
	subtopics: Subtopic[]
}

export type CreateTopicDto = Omit<Topic, "id" | "createdAt">
export type UpdateTopicDto = Partial<CreateTopicDto>

export type CreateSubtopicDto = Omit<Subtopic, "id" | "createdAt" | "completed">
export type UpdateSubtopicDto = Partial<Omit<Subtopic, "id" | "createdAt">>
