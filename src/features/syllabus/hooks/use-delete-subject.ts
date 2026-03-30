"use client"
import { SYLLABUS } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import syllabusService from "../services/syllabus.service"

export default function useDeleteSubject() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (subjectId: string) => syllabusService.removeSubject(subjectId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...SYLLABUS, "subjects"] })
			toast.success("Asignatura eliminada.")
		},
		onError: () => {
			toast.error("Error al eliminar la asignatura.")
		}
	})
}
