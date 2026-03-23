import { useUser } from "@/hooks/use-user";
import { TASKS } from "@/lib/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import taskService from "../services/task.service";
import { Task } from "../task.type";


export default function useUpdateTask() {
  const queryClient = useQueryClient()
  const { data: user } = useUser()

  return useMutation({
		mutationFn: ({ taskId, task }: { taskId: string; task: Partial<Task> }) => taskService.update(taskId, task),
		onMutate: async ({ taskId, task }) => {
			await queryClient.cancelQueries({ queryKey: [...TASKS, user?.id] })
			const previousTasks = queryClient.getQueryData<Task[]>([...TASKS, user?.id])

			if (previousTasks) {
				queryClient.setQueryData<Task[]>(
					[...TASKS, user?.id],
					previousTasks.map((t) => (t._id === taskId ? { ...t, ...task } : t))
				)
			}
			return { previousTasks }
		},
		onError: (_err, _variables, context) => {
			if (context?.previousTasks) {
				queryClient.setQueryData([...TASKS, user?.id], context.previousTasks)
			}
			toast.error("Error al actualizar la Tarea.")
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [...TASKS, user?.id] })
		}
	})
}