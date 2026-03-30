"use client"
import { SYLLABUS } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import syllabusService from "../services/syllabus.service"

export default function useSubjects() {
	return useQuery({
		queryKey: [...SYLLABUS, "subjects"],
		queryFn: () => syllabusService.selectSubjects()
	})
}
