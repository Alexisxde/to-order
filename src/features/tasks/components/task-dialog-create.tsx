"use client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { SubmitHandler } from "react-hook-form"
import type { z } from "zod"
import useCreateTask from "../hooks/use-create-task"
import taskCreateSchema from "../schemas/task-create"
import type { TaskStatus } from "../task.type"
import { TaskForm } from "./task-form"

interface TaskDialogCreateProps {
	defaultStatus?: TaskStatus
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function TaskDialogCreate({ defaultStatus = "todo", open, onOpenChange }: TaskDialogCreateProps) {
	const { mutate: create } = useCreateTask()

	const onSubmit: SubmitHandler<z.infer<typeof taskCreateSchema>> = async (data) => {
		create(data)
		onOpenChange(false)
	}

	const onCancel = () => {
		onOpenChange(false)
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Crear nueva tarea</DialogTitle>
					<DialogDescription>Añade una nueva tarea para organizar tu trabajo.</DialogDescription>
				</DialogHeader>
				<TaskForm
					submitText="Crear tarea"
					onSubmit={onSubmit}
					onCancel={onCancel}
					defaultValues={{ column: defaultStatus }}
				/>
			</DialogContent>
		</Dialog>
	)
}
