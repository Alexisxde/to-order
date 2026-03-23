import { useUser } from "@/hooks/use-user"
import { TASKS } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import taskService from "../services/task.service"
import type { Task } from "../task.type"

export default function useDeleteTask() {
	const queryClient = useQueryClient()
	const { data: user } = useUser()

	return useMutation({
		mutationFn: (taskId: string) => taskService.remove(taskId),
		onMutate: async (taskId) => {
			await queryClient.cancelQueries({ queryKey: [...TASKS, user?.id] })
			const previousTasks = queryClient.getQueryData<Task[]>([...TASKS, user?.id])

			if (previousTasks) {
				queryClient.setQueryData<Task[]>(
					[...TASKS, user?.id],
					previousTasks.filter((t) => t._id !== taskId)
				)
			}
			return { previousTasks }
		},
		onError: (_err, _variables, context) => {
			if (context?.previousTasks) {
				queryClient.setQueryData([...TASKS, user?.id], context.previousTasks)
			}
			toast.error("Error al eliminar la Tarea.")
		},
		onSuccess: () => {
			toast.success("Tarea eliminada.")
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [...TASKS, user?.id] })
		}
	})
}
