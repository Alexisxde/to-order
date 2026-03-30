"use client"
import { SYLLABUS } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import syllabusService from "../services/syllabus.service"

export default function useUpdateSubject() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ subjectId, name }: { subjectId: string; name: string }) =>
			syllabusService.updateSubject(subjectId, name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...SYLLABUS, "subjects"] })
			toast.success("Asignatura actualizada.")
		},
		onError: () => {
			toast.error("Error al actualizar la asignatura.")
		}
	})
}
