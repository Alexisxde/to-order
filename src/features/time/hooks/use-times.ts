"use client"
import { useUser } from "@/hooks/use-user"
import { TIME } from "@/lib/query-keys"
import { useQuery } from "@tanstack/react-query"
import timeService from "../services/time.service"

export default function useTimes() {
	const { data: user } = useUser()
	return useQuery({
		queryKey: [...TIME, user?.id],
		queryFn: () => timeService.select(user?.id),
		enabled: !!user
	})
}
