"use client"
import { SYLLABUS } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import syllabusService from "../services/syllabus.service"
import type { UpdateTopicDto } from "../syllabus.type"

export default function useUpdateTopic(subjectId: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ topicId, topic }: { topicId: string; topic: UpdateTopicDto }) =>
			syllabusService.updateTopic(topicId, topic),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...SYLLABUS, "topics", subjectId] })
			toast.success("Tema actualizado.")
		},
		onError: () => {
			toast.error("Error al actualizar el tema.")
		}
	})
}
