"use client"
import { SYLLABUS } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import syllabusService from "../services/syllabus.service"

export default function useCreateSubject() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (name: string) => syllabusService.insertSubject(name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...SYLLABUS, "subjects"] })
			toast.success("Asignatura creada correctamente.")
		},
		onError: () => {
			toast.error("Error al crear la asignatura.")
		}
	})
}
