"use client"
import { SYLLABUS } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import syllabusService from "../services/syllabus.service"

export default function useDeleteTopic(subjectId: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (topicId: string) => syllabusService.removeTopic(topicId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...SYLLABUS, "topics", subjectId] })
			toast.success("Tema eliminado.")
		},
		onError: () => {
			toast.error("Error al eliminar el tema.")
		}
	})
}
