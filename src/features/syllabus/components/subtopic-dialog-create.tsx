"use client"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import useCreateSubtopic from "../hooks/use-create-subtopic"
import { subtopicSchema } from "../schemas/subtopic.schema"

type SubtopicFormValues = z.infer<typeof subtopicSchema>

interface SubtopicDialogCreateProps {
	subjectId: string
	topicId: string | null
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function SubtopicDialogCreate({ subjectId, topicId, open, onOpenChange }: SubtopicDialogCreateProps) {
	const { mutate: create, isPending } = useCreateSubtopic(subjectId)

	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors }
	} = useForm<SubtopicFormValues>({
		resolver: zodResolver(subtopicSchema),
		defaultValues: {
			name: "",
			topicId: topicId ?? ""
		}
	})

	useEffect(() => {
		if (topicId) {
			setValue("topicId", topicId)
		}
	}, [topicId, setValue])

	const onSubmit = (data: SubtopicFormValues) => {
		create(data, {
			onSuccess: () => {
				onOpenChange(false)
				reset()
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>Nuevo Subtema</DialogTitle>
					<DialogDescription>Añade un subtema al tema seleccionado.</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<Field>
						<FieldLabel>Nombre del subtema</FieldLabel>
						<Input placeholder="Ej: Variables y Tipos de Datos" {...register("name")} />
						{errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
					</Field>
					<DialogFooter>
						<Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
							Cancelar
						</Button>
						<Button type="submit" disabled={isPending}>
							Crear Subtema
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
