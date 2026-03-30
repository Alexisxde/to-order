"use client"
import { SYLLABUS } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import syllabusService from "../services/syllabus.service"

export default function useDeleteSubtopic(subjectId: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (subtopicId: string) => syllabusService.removeSubtopic(subtopicId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...SYLLABUS, "topics", subjectId] })
			toast.success("Subtema eliminado.")
		},
		onError: () => {
			toast.error("Error al eliminar el subtema.")
		}
	})
}
