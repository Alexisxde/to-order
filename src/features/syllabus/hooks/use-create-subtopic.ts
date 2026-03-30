"use client"
import { SYLLABUS } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import syllabusService from "../services/syllabus.service"
import type { CreateSubtopicDto } from "../syllabus.type"

export default function useCreateSubtopic(subjectId: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: CreateSubtopicDto) => syllabusService.insertSubtopic(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...SYLLABUS, "topics", subjectId] })
			toast.success("Subtema creado correctamente.")
		},
		onError: () => {
			toast.error("Error al crear el subtema.")
		}
	})
}
