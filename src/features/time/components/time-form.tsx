"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { timeCreateSchema } from "../schemas/time.schema"

type TimeFormValues = z.infer<typeof timeCreateSchema>

interface TimeFormProps {
	defaultValues?: Partial<TimeFormValues>
	onSubmit: (data: TimeFormValues) => void
	onCancel: () => void
	onDelete?: () => void
	submitText: string
}

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const TYPES = ["Teoría", "Laboratorio", "Práctica", "Tutoria"]
const COLORS = [
	{ value: "#FF5733", label: "Naranja" },
	{ value: "#33FF57", label: "Verde" },
	{ value: "#3357FF", label: "Azul" },
	{ value: "#FF33A8", label: "Rosa" },
	{ value: "#FFD133", label: "Amarillo" }
]

export function TimeForm({ defaultValues, onSubmit, onCancel, onDelete, submitText }: TimeFormProps) {
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting }
	} = useForm<TimeFormValues>({
		resolver: zodResolver(timeCreateSchema),
		defaultValues: {
			subject: defaultValues?.subject ?? "",
			description: defaultValues?.description ?? "",
			day: defaultValues?.day ?? "Lunes",
			color: defaultValues?.color ?? "#FF5733",
			url: defaultValues?.url ?? "",
			type: defaultValues?.type ?? "Teoría",
			time_start: defaultValues?.time_start ?? "08:00",
			time_end: defaultValues?.time_end ?? "10:00"
		}
	})

	const day = watch("day")
	const color = watch("color")
	const type = watch("type")

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<Field>
				<FieldLabel>Materia</FieldLabel>
				<Input placeholder="Ej: Matemática I" {...register("subject")} />
				{errors.subject && <FieldError>{errors.subject.message}</FieldError>}
			</Field>

			<Field>
				<FieldLabel>
					Descripción{" "}
					<Badge variant="outline" className="text-[10px]">
						Opcional
					</Badge>
				</FieldLabel>
				<Textarea placeholder="Ej: Aula 6, Edificio de Ingenieria" {...register("description")} />
				{errors.description && <FieldError>{errors.description.message}</FieldError>}
			</Field>

			<div className="grid grid-cols-2 gap-4">
				<Field>
					<FieldLabel>Día</FieldLabel>
					<Select value={day} onValueChange={(v: any) => setValue("day", v)}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{DAYS.map((d) => (
								<SelectItem key={d} value={d}>
									{d}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>

				<Field>
					<FieldLabel>Tipo</FieldLabel>
					<Select value={type} onValueChange={(v: any) => setValue("type", v)}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{TYPES.map((t) => (
								<SelectItem key={t} value={t}>
									{t}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<Field>
					<FieldLabel>Hora Inicio</FieldLabel>
					<Input type="time" {...register("time_start")} />
					{errors.time_start && <FieldError>{errors.time_start.message}</FieldError>}
				</Field>

				<Field>
					<FieldLabel>Hora Fin</FieldLabel>
					<Input type="time" {...register("time_end")} />
					{errors.time_end && <FieldError>{errors.time_end.message}</FieldError>}
				</Field>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<Field>
					<FieldLabel>Color</FieldLabel>
					<Select value={color} onValueChange={(v: any) => setValue("color", v)}>
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{COLORS.map((c) => (
								<SelectItem key={c.value} value={c.value}>
									<div className="flex items-center gap-2">
										<div className="size-4 rounded-full" style={{ backgroundColor: c.value }} />
										{c.label}
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</Field>

				<Field>
					<FieldLabel>
						URL{" "}
						<Badge variant="outline" className="text-[10px]">
							Opcional
						</Badge>
					</FieldLabel>
					<Input placeholder="Enlace de la clase" {...register("url")} />
					{errors.url && <FieldError>{errors.url.message}</FieldError>}
				</Field>
			</div>

			<div className="flex items-center justify-between pt-4 border-t border-border">
				{onDelete ? (
					<Button
						type="button"
						variant="ghost"
						size="icon"
						className="text-muted-foreground hover:text-destructive transition-colors"
						onClick={onDelete}>
						<Trash className="size-4" />
					</Button>
				) : (
					<div />
				)}
				<div className="flex gap-3">
					<Button type="button" variant="ghost" onClick={onCancel} className="font-semibold">
						Cancelar
					</Button>
					<Button type="submit" disabled={isSubmitting} className="font-semibold">
						{submitText}
					</Button>
				</div>
			</div>
		</form>
	)
}
