"use client"
import Button from "@/components/ui/button"
import Error from "@/components/ui/error"
import { useTask } from "@/hooks/useTask"
import { createTaskSchema } from "@/lib/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlignLeft, BookOpen, Flag, Link } from "lucide-react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

type FormData = z.infer<typeof createTaskSchema>

interface Props {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormCreateTask({ setIsOpen }: Props) {
	const { createTask } = useTask()
	const {
		register,
		handleSubmit,
		reset,
		formState: { isSubmitting, errors }
	} = useForm<FormData>({ resolver: zodResolver(createTaskSchema) })

	const onSubmit: SubmitHandler<FormData> = async ({ title, description, ...restForm }) => {
		await createTask({
			...restForm,
			title: `${title.trim()[0].toUpperCase()}${title.trim().slice(1)}`,
			description: description ? `${description.trim()[0].toUpperCase()}${description.trim().slice(1)}` : ""
		})
		reset()
		setIsOpen(false)
	}

	return (
		<div className="lg:pt-3">
			<h2 className="mb-4 text-xl font-medium">Nueva Tarea</h2>
			<form
				id="form-created-task"
				autoComplete="off"
				onSubmit={handleSubmit(onSubmit)}
				className="text-primary/75 flex flex-col gap-2 text-sm">
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
						{...register("description")}
					/>
				</label>
				<div className="border-border relative flex items-center justify-between rounded-lg border px-3 py-1.5">
					<span className="bg-card pointer-events-none absolute -top-2 left-2.5 h-fit px-1 text-[10px] text-neutral-400">
						Prioridad <b className="text-destructive">*</b>
					</span>
					<Flag className="size-5" />
					<div className="flex size-full flex-wrap gap-1 px-3">
						{[
							{
								label: "Bajo",
								value: "low",
								icon: <Flag className="size-3 fill-green-600 stroke-green-700" />
							},
							{
								label: "Medio",
								value: "medium",
								icon: <Flag className="size-3 fill-orange-600 stroke-orange-700" />
							},
							{
								label: "Alto",
								value: "high",
								icon: <Flag className="size-3 fill-red-600 stroke-red-700" />
							}
						].map(({ label, icon, value }) => (
							<label key={value} className="flex cursor-pointer items-center gap-1">
								<input
									type="radio"
									defaultChecked={value === "low"}
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
				<label className="border-border relative flex items-center justify-between rounded-lg border px-3 py-1.5">
					<span className="bg-card pointer-events-none absolute -top-2 left-2.5 h-fit px-1 text-[10px] text-neutral-400">
						URL
					</span>
					<Link className="size-5" />
					<input
						type="url"
						className="size-full px-3 py-1.5 focus:outline-none"
						placeholder="https://example.com"
						{...register("url")}
					/>
				</label>
				{errors.url && <Error message={errors.url.message} />}
				<div className="flex w-full items-center justify-end">
					<Button form="form-created-task" type="submit" size={"lg"} disabled={isSubmitting}>
						{isSubmitting ? "Guardando..." : "Guardar"}
					</Button>
				</div>
			</form>
		</div>
	)
}
