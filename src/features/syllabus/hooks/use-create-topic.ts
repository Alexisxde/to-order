"use client"
import { SYLLABUS } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import syllabusService from "../services/syllabus.service"
import type { CreateTopicDto } from "../syllabus.type"

export default function useCreateTopic(subjectId: string) {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (data: CreateTopicDto) => syllabusService.insertTopic(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...SYLLABUS, "topics", subjectId] })
			toast.success("Tema creado correctamente.")
		},
		onError: () => {
			toast.error("Error al crear el tema.")
		}
	})
}
