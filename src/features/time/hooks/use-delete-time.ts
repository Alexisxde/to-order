"use client"
import { useUser } from "@/hooks/use-user"
import { TIME } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import timeService from "../services/time.service"
import type { Time } from "../time.type"

export default function useDeleteTime() {
	const queryClient = useQueryClient()
	const { data: user } = useUser()

	return useMutation({
		mutationFn: (timeId: string) => timeService.remove(timeId),
		onMutate: async (timeId) => {
			await queryClient.cancelQueries({ queryKey: [...TIME, user?.id] })
			const previousTimes = queryClient.getQueryData<Time[]>([...TIME, user?.id])

			if (previousTimes) {
				queryClient.setQueryData<Time[]>(
					[...TIME, user?.id],
					previousTimes.filter((t) => t._id !== timeId)
				)
			}
			return { previousTimes }
		},
		onError: (_err, _variables, context) => {
			if (context?.previousTimes) {
				queryClient.setQueryData([...TIME, user?.id], context.previousTimes)
			}
			toast.error("Error al eliminar el horario.")
		},
		onSuccess: () => {
			toast.success("Horario eliminado.")
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [...TIME, user?.id] })
		}
	})
}
