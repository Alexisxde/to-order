"use client"
import { useUser } from "@/hooks/use-user"
import { TASKS } from "@/lib/query-keys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import taskService from "../services/task.service"
import { CreateTaskDto } from "../task.type"

export default function useCreateTask() {
  const queryClient = useQueryClient()
  const { data: user } = useUser()
  return useMutation({
    mutationFn: (data: CreateTaskDto) => taskService.insert(data, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [...TASKS, user?.id] })
      toast.success("Tarea creada correctamente.")
    },
    onError: () => {
      toast.error("Error al crear la Tarea.")
    }
  })
}