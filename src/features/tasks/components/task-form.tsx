"use client"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import taskCreateSchema from "../schemas/task-create"
import type { TaskPriority, TaskStatus } from "../task.type"

type TaskFormValues = z.infer<typeof taskCreateSchema>

interface TaskFormProps {
	defaultValues?: Partial<TaskFormValues>
	onSubmit: (data: TaskFormValues) => void
	onCancel: () => void
	submitText: string
}

export function TaskForm({ defaultValues, onSubmit, onCancel, submitText }: TaskFormProps) {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting }
	} = useForm<TaskFormValues>({
		resolver: zodResolver(taskCreateSchema),
		defaultValues: {
			title: defaultValues?.title ?? "",
			description: defaultValues?.description ?? "",
			priority: defaultValues?.priority ?? "medium",
			column: defaultValues?.column ?? "todo"
		}
	})

	const priority = watch("priority")
	const column = watch("column")

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<Field>
				<FieldLabel>Título</FieldLabel>
				<Input placeholder="Ej: Comprar leche" {...register("title")} />
				{errors.title && <FieldError>{errors.title.message}</FieldError>}
			</Field>

			<Field>
				<FieldLabel>Descripción</FieldLabel>
				<Textarea placeholder="Ej: Ir al supermercado y comprar leche deslactosada" {...register("description")} />
				{errors.description && <FieldError>{errors.description.message}</FieldError>}
			</Field>

			<div className="grid grid-cols-2 gap-4">
				<Field>
					<FieldLabel>Prioridad</FieldLabel>
					<Select value={priority} onValueChange={(value: TaskPriority) => setValue("priority", value)}>
						<SelectTrigger>
							<SelectValue placeholder="Selecciona prioridad" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="low">Baja</SelectItem>
							<SelectItem value="medium">Media</SelectItem>
							<SelectItem value="high">Alta</SelectItem>
						</SelectContent>
					</Select>
				</Field>

				<Field>
					<FieldLabel>Estado</FieldLabel>
					<Select value={column} onValueChange={(value: TaskStatus) => setValue("column", value)}>
						<SelectTrigger>
							<SelectValue placeholder="Selecciona estado" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="todo">Por Hacer</SelectItem>
							<SelectItem value="in-progress">En Progreso</SelectItem>
							<SelectItem value="review">En Revisión</SelectItem>
							<SelectItem value="done">Completado</SelectItem>
						</SelectContent>
					</Select>
				</Field>
			</div>

			<div className="flex justify-end gap-3 pt-4 border-t border-border">
				<Button type="button" variant="ghost" onClick={onCancel}>
					Cancelar
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{submitText}
				</Button>
			</div>
		</form>
	)
}
