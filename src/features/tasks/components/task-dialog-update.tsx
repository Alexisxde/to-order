"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { SubmitHandler } from "react-hook-form"
import type { z } from "zod"
import useUpdateTask from "../hooks/use-update-task"
import taskCreateSchema from "../schemas/task-create"
import type { Task } from "../task.type"
import { TaskForm } from "./task-form"

interface TaskDialogUpdateProps {
	task: Task | null
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function TaskDialogUpdate({ task, open, onOpenChange }: TaskDialogUpdateProps) {
	const { mutate: update } = useUpdateTask()

	if (!task) return null

	const onSubmit: SubmitHandler<z.infer<typeof taskCreateSchema>> = async (data) => {
		update({ taskId: task._id, task: data })
		onOpenChange(false)
	}

	const onCancel = () => {
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Editar tarea</DialogTitle>
					<DialogDescription>Modifica los detalles de tu tarea.</DialogDescription>
				</DialogHeader>
				<TaskForm
					submitText="Guardar cambios"
					onSubmit={onSubmit}
					onCancel={onCancel}
					defaultValues={{
						title: task.title,
						description: task.description,
						priority: task.priority,
						column: task.column
					}}
				/>
			</DialogContent>
		</Dialog>
	)
}
