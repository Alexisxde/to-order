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
import { useForm } from "react-hook-form"
import type { z } from "zod"
import useCreateTopic from "../hooks/use-create-topic"
import { topicSchema } from "../schemas/topic.schema"

type TopicFormValues = z.infer<typeof topicSchema>

interface TopicDialogCreateProps {
	subjectId: string
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function TopicDialogCreate({ subjectId, open, onOpenChange }: TopicDialogCreateProps) {
	const { mutate: create, isPending } = useCreateTopic(subjectId)

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TopicFormValues>({
		resolver: zodResolver(topicSchema),
		defaultValues: {
			name: "",
			subjectId
		}
	})

	const onSubmit = (data: TopicFormValues) => {
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
					<DialogTitle>Nuevo Tema</DialogTitle>
					<DialogDescription>Añade un tema principal al programa de estudio.</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<Field>
						<FieldLabel>Nombre del tema</FieldLabel>
						<Input placeholder="Ej: Introducción a la Programación" {...register("name")} />
						{errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
					</Field>
					<DialogFooter>
						<Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
							Cancelar
						</Button>
						<Button type="submit" disabled={isPending}>
							Crear Tema
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
