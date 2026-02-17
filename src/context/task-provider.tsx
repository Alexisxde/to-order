"use client"
import { useUser } from "@/hooks/use-user"
import { TASKS } from "@/lib/query-keys"
import TaskService from "@/module/tasks/task.service"
import type { CreateTaskDto, Task } from "@/module/tasks/task.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext } from "react"
import { toast } from "sonner"

export type TaskContextType = {
	isLoading: boolean
	isError: boolean
	tasks: Task[] | []
	// create: (id, data): CreateTaskDto) => void
	// update: (id, data): UpdateTaskDto) => void
	// deleted: (id, data): DeleteTaskDto) => void
	// move: (id, data): MoveTaskDto) => void
}

export const TaskContext = createContext<TaskContextType | null>(null)

export function TasksProvider({ children }: { children: React.ReactNode }) {
	const queryClient = useQueryClient()
	const { data: user } = useUser()

	const { data, isLoading, isError } = useQuery({
		queryKey: [...TASKS, user?.id],
		queryFn: () => TaskService.select(user?.id),
		enabled: !!user
	})

	const create = useMutation({
		mutationFn: (data: CreateTaskDto) => TaskService.create(data, user?.id),
		onMutate: (_data: CreateTaskDto) => {
			const previousTasks = queryClient.getQueryData<Task[]>([...TASKS, user?.id])
			// if (previousTasks) queryClient.setQueryData<Folder[]>([...TASKS, user?.id], [...previousTasks, newFolder])
			return { previousTasks }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousTasks) queryClient.setQueryData<Task[]>([...TASKS, user?.id], context.previousTasks)
			toast.error("Error al crear la Tarea.")
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [...TASKS, user?.id] })
			toast.success("Tarea creada correctamente.")
		}
	})

	return (
		<TaskContext.Provider
			value={{
				isLoading,
				isError,
				tasks: data || []
				// create: ({ name, rootId }) => create.mutate({ name, rootId }),
				// update: ({ id, name }) => update.mutate({ id, name }),
				// deleted: ({ id, deleted: d }) => deleted.mutate({ id, deleted: d }),
				// move: ({ id, rootId }) => move.mutate({ id, rootId })
			}}>
			{children}
		</TaskContext.Provider>
	)
}
