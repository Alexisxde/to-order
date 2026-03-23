"use client"
import TaskService from "@/features/tasks/services/task.service"
import { useUser } from "@/hooks/use-user"
import { TASKS } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"

export default function useTask() {
	const { data: user } = useUser()
	return useQuery({
		queryKey: [...TASKS, user?.id],
		queryFn: () => TaskService.select(user?.id),
		enabled: !!user
	})
}
