"use client"
import { Button } from "@/components/ui/button"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { BookOpen, Plus } from "lucide-react"
import { useState } from "react"
import useTopics from "../hooks/use-topics"
import { SubtopicDialogCreate } from "./subtopic-dialog-create"
import { TopicDialogCreate } from "./topic-dialog-create"
import { TopicItem } from "./topic-item"

interface SyllabusPageProps {
	subjectName: string | null
	subjectId: string
}

export default function SyllabusPage({ subjectName, subjectId }: SyllabusPageProps) {
	const { data: topics, isLoading } = useTopics(subjectId)

	const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false)
	const [isCreateSubtopicOpen, setIsCreateSubtopicOpen] = useState(false)
	const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)

	const handleAddSubtopic = (topicId: string) => {
		setSelectedTopicId(topicId)
		setIsCreateSubtopicOpen(true)
	}

	if (isLoading) {
		return (
			<div className="space-y-4">
				{[1, 2, 3].map((i) => (
					<Skeleton key={i} className="h-20 w-full rounded-lg" />
				))}
			</div>
		)
	}

	return (
		<div className="space-y-6">
			<header className="flex items-center justify-between">
				<h1 className="text-xl font-medium tracking-tight">{subjectName}</h1>
				<Button onClick={() => setIsCreateTopicOpen(true)} className="gap-2">
					<Plus className="size-4" />
					Nuevo Tema
				</Button>
			</header>

			{topics && topics.length > 0 ? (
				<div className="grid gap-4">
					{topics.map((topic) => (
						<TopicItem key={topic.id} topic={topic} subjectId={subjectId} onAddSubtopic={handleAddSubtopic} />
					))}
				</div>
			) : (
				<Empty>
					<EmptyHeader>
						<EmptyMedia>
							<BookOpen className="size-10 text-muted-foreground/50" />
						</EmptyMedia>
						<EmptyTitle>No hay temas registrados</EmptyTitle>
						<EmptyDescription>
							Comienza añadiendo los temas de tu asignatura para llevar un control de tu progreso.
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			)}

			<TopicDialogCreate subjectId={subjectId} open={isCreateTopicOpen} onOpenChange={setIsCreateTopicOpen} />

			<SubtopicDialogCreate
				subjectId={subjectId}
				topicId={selectedTopicId}
				open={isCreateSubtopicOpen}
				onOpenChange={setIsCreateSubtopicOpen}
			/>
		</div>
	)
}
