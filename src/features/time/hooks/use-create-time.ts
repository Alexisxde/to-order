"use client"
import { useUser } from "@/hooks/use-user"
import { TIME } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import timeService, { type CreateTimeDto } from "../services/time.service"
import type { Time } from "../time.type"

export default function useCreateTime() {
	const queryClient = useQueryClient()
	const { data: user } = useUser()

	return useMutation({
		mutationFn: (time: CreateTimeDto) => timeService.insert(time, user?.id),
		onMutate: async (newTime) => {
			await queryClient.cancelQueries({ queryKey: [...TIME, user?.id] })
			const previousTimes = queryClient.getQueryData<Time[]>([...TIME, user?.id])

			if (previousTimes) {
				queryClient.setQueryData<Time[]>([...TIME, user?.id], [
					...previousTimes,
					{ ...newTime, _id: "temp-id", created_at: new Date().toISOString(), user_id: user?.id ?? "" } as Time
				])
			}
			return { previousTimes }
		},
		onError: (_err, _variables, context) => {
			if (context?.previousTimes) {
				queryClient.setQueryData([...TIME, user?.id], context.previousTimes)
			}
			toast.error("Error al crear el horario.")
		},
		onSuccess: () => {
			toast.success("Horario creado correctamente.")
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [...TIME, user?.id] })
		}
	})
}
