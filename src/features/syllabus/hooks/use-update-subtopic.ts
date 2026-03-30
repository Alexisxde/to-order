"use client"
import { SYLLABUS } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import syllabusService from "../services/syllabus.service"
import type { UpdateSubtopicDto } from "../syllabus.type"

export default function useUpdateSubtopic(subjectId: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ subtopicId, subtopic }: { subtopicId: string; subtopic: UpdateSubtopicDto }) =>
			syllabusService.updateSubtopic(subtopicId, subtopic),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...SYLLABUS, "topics", subjectId] })
		},
		onError: () => {
			toast.error("Error al actualizar el subtema.")
		}
	})
}
