"use client"
import Error from "@/components/ui/error"
import { editTaskSchema } from "@/lib/schema"
import { useTask } from "@/providers/task-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	AlignLeft,
	BookOpen,
	Check,
	Columns3,
	Flag,
	Link,
	Loader,
	Plus
} from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import Button from "./ui/button"

type FormData = z.infer<typeof editTaskSchema>

interface Props {
	id: string
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormEditTask({ id, setIsOpen }: Props) {
	const { getTaskId, updateTask } = useTask()
	const task = getTaskId(id)
	if (!task) return null
	const { title, description, url, priority, column } = task

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({ resolver: zodResolver(editTaskSchema) })

	const onSubmit: SubmitHandler<FormData> = async ({
		title,
		description,
		...restForm
	}) => {
		await updateTask({
			...task,
			...restForm,
			title: `${title.trim()[0].toUpperCase()}${title.trim().slice(1)}`,
			description: description
				? `${description.trim()[0].toUpperCase()}${description.trim().slice(1)}`
				: ""
		})
		reset()
		setIsOpen(false)
	}

	return (
		<div>
			<h2 className="mb-4 text-xl font-medium">Editar Tarea</h2>
			<form
				id="form-edit-task"
				autoComplete="off"
				onSubmit={handleSubmit(onSubmit)}
				className="text-primary/75 flex flex-col gap-2 text-xs">
				<label className="border-border relative flex items-center justify-between rounded-lg border px-3 py-1.5">
					<span className="bg-card pointer-events-none absolute -top-2 left-2.5 h-fit px-1 text-[10px] text-neutral-400">
						Título <b className="text-destructive">*</b>
					</span>
					<BookOpen className="size-5" />
					<input
						type="text"
						className="size-full px-3 py-1.5 focus:outline-none"
						placeholder="Añadir título"
						{...register("title")}
						defaultValue={title}
					/>
				</label>
				{errors.title && <Error message={errors.title.message} />}
				<label className="border-border relative flex items-center justify-between rounded-lg border px-3 py-1.5">
					<span className="bg-card pointer-events-none absolute -top-2 left-2.5 h-fit px-1 text-[10px] text-neutral-400">
						Descripción
					</span>
					<AlignLeft className="size-5" />
					<input
						type="text"
						className="size-full px-3 py-1.5 focus:outline-none"
						placeholder="Añadir descripción"
						defaultValue={description}
						{...register("description")}
					/>
				</label>
				<div className="border-border relative flex items-center justify-between rounded-lg border px-3 py-1.5">
					<span className="bg-card pointer-events-none absolute -top-2 left-2.5 h-fit px-1 text-[10px] text-neutral-400">
						Prioridad <b className="text-destructive">*</b>
					</span>
					<Flag className="size-5" />
					<div className="flex size-full flex-wrap items-center gap-1 px-3">
						{[
							{
								label: "Bajo",
								value: "low",
								icon: (
									<Flag className="size-3 fill-green-600 stroke-green-700" />
								)
							},
							{
								label: "Medio",
								value: "medium",
								icon: (
									<Flag className="size-3 fill-orange-600 stroke-orange-700" />
								)
							},
							{
								label: "Alto",
								value: "high",
								icon: <Flag className="size-3 fill-red-600 stroke-red-700" />
							}
						].map(({ label, icon, value }) => (
							<label
								key={value}
								className="flex cursor-pointer items-center gap-1">
								<input
									type="radio"
									defaultChecked={value === priority}
									className="peer sr-only"
									value={value}
									{...register("priority")}
								/>
								<div className="border-border peer-checked:ring-border flex items-center justify-center gap-1 rounded-full border px-2 py-1 transition-colors not-peer-checked:opacity-75 peer-checked:ring-1">
									{icon}
									<span className="text-xs">{label}</span>
								</div>
							</label>
						))}
					</div>
				</div>
				{errors.priority && <Error message={errors.priority.message} />}
				<div className="border-border relative flex items-center gap-1 rounded-lg border px-3 py-1.5">
					<span className="bg-card pointer-events-none absolute -top-2 left-2.5 h-fit px-1 text-[10px] text-neutral-400">
						Columna <b className="text-destructive">*</b>
					</span>
					<Columns3 className="size-5" />
					<div className="flex size-full flex-wrap items-center gap-1 px-3">
						{[
							{
								label: "Nueva",
								value: "new",
								icon: <Plus className="size-3 stroke-green-700" />
							},
							{
								label: "En Progreso",
								value: "progress",
								icon: <Loader className="size-3 stroke-blue-700" />
							},
							{
								label: "Completada",
								value: "completed",
								icon: <Check className="size-3 stroke-green-700" />
							}
						].map(({ label, icon, value }) => (
							<label
								key={value}
								className="flex cursor-pointer items-center gap-1">
								<input
									type="radio"
									defaultChecked={value === column}
									className="peer sr-only"
									value={value}
									{...register("column")}
								/>
								<div className="border-border peer-checked:ring-border flex items-center justify-center gap-1 rounded-full border px-2 py-1 transition-colors not-peer-checked:opacity-75 peer-checked:ring-1">
									{icon}
									<span className="text-xs">{label}</span>
								</div>
							</label>
						))}
					</div>
				</div>
				{errors.priority && <Error message={errors.priority.message} />}
				<label className="border-border relative flex items-center justify-between rounded-lg border px-3 py-1.5">
					<span className="bg-card pointer-events-none absolute -top-2 left-2.5 h-fit px-1 text-[10px] text-neutral-400">
						URL
					</span>
					<Link className="size-5" />
					<input
						type="url"
						className="size-full px-3 py-1.5 focus:outline-none"
						placeholder="https://example.com"
						defaultValue={url}
						{...register("url")}
					/>
				</label>
				{errors.url && <Error message={errors.url.message} />}
				<div className="flex items-center justify-end gap-2">
					<Button form="form-edit-task" type="submit">
						Guardar
					</Button>
				</div>
			</form>
		</div>
	)
}
