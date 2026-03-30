"use client"
import { SYLLABUS } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import syllabusService from "../services/syllabus.service"

export default function useTopics(subjectId: string) {
	return useQuery({
		queryKey: [...SYLLABUS, "topics", subjectId],
		queryFn: () => syllabusService.selectTopics(subjectId),
		enabled: !!subjectId
	})
}
