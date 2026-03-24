"use client"
import { useUser } from "@/hooks/use-user"
import { TIME } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import timeService, { type UpdateTimeDto } from "../services/time.service"
import type { Time } from "../time.type"

export default function useUpdateTime() {
	const queryClient = useQueryClient()
	const { data: user } = useUser()

	return useMutation({
		mutationFn: ({ timeId, time }: { timeId: string; time: UpdateTimeDto }) => timeService.update(timeId, time),
		onMutate: async ({ timeId, time }) => {
			await queryClient.cancelQueries({ queryKey: [...TIME, user?.id] })
			const previousTimes = queryClient.getQueryData<Time[]>([...TIME, user?.id])

			if (previousTimes) {
				queryClient.setQueryData<Time[]>(
					[...TIME, user?.id],
					previousTimes.map((t) => (t._id === timeId ? { ...t, ...time } : t))
				)
			}
			return { previousTimes }
		},
		onError: (_err, _variables, context) => {
			if (context?.previousTimes) {
				queryClient.setQueryData([...TIME, user?.id], context.previousTimes)
			}
			toast.error("Error al actualizar el horario.")
		},
		onSuccess: () => {
			toast.success("Horario actualizado.")
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [...TIME, user?.id] })
		}
	})
}
