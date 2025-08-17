"use client"
import TimeCalendar from "@/components/time-calendar"
import Button from "@/components/ui/button"
import Error from "@/components/ui/error"
import {
	MorphingDialog,
	MorphingDialogClose,
	MorphingDialogContainer,
	MorphingDialogContent,
	MorphingDialogTrigger
} from "@/components/ui/morphing-dialog"
import { createTimeShema } from "@/lib/schema"
import { useTime } from "@/providers/time-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import {
	AlignLeft,
	ArrowRight,
	BookOpen,
	BookType,
	Calendar,
	Clock,
	Link,
	Plus
} from "lucide-react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"

type FormData = z.infer<typeof createTimeShema>

export default function Page() {
	const { createTime } = useTime()
	const [isOpen, setIsOpen] = useState(false)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<FormData>({ resolver: zodResolver(createTimeShema) })

	const onSubmit: SubmitHandler<FormData> = async ({
		subject,
		description,
		...restForm
	}) => {
		await createTime({
			...restForm,
			subject: `${subject.trim()[0].toUpperCase()}${subject.trim().slice(1)}`,
			description: description
				? `${description.trim()[0].toUpperCase()}${description.trim().slice(1)}`
				: ""
		})
		reset()
		setIsOpen(false)
	}

	return (
		<section>
			<header className="flex items-center justify-between px-4 py-2">
				<h1 className="text-3xl">Horarios</h1>
				<MorphingDialog isOpen={isOpen} setIsOpen={setIsOpen}>
					<MorphingDialogTrigger>
						<Plus />
					</MorphingDialogTrigger>
					<MorphingDialogContainer
						overlay={false}
						className="items-start justify-end pt-10 pr-5">
						<MorphingDialogContent className="size-fit">
							<MorphingDialogClose />
							<h2 className="mt-3 text-xl">Nuevo horario</h2>
							<form
								id="form-created-time"
								autoComplete="off"
								onSubmit={handleSubmit(onSubmit)}
								className="text-primary/75 flex flex-col gap-1.5 pt-4 text-xs">
								<label className="border-border flex items-center justify-between rounded-lg border px-3 py-1.5">
									<BookOpen className="size-5" />
									<input
										type="text"
										className="size-full px-3 py-1.5 focus:outline-none"
										placeholder="Añadir clase"
										{...register("subject")}
									/>
								</label>
								{errors.subject && <Error message={errors.subject.message} />}
								<div className="border-border flex items-center justify-between rounded-lg border px-3 py-1.5">
									<Calendar className="size-5" />
									<input
										list="dia"
										className="w-full appearance-none px-3 py-1.5 focus:outline-none"
										placeholder="Añadir día"
										{...register("day")}
									/>
									<datalist id="dia">
										<option value="Lunes" />
										<option value="Martes" />
										<option value="Miércoles" />
										<option value="Jueves" />
										<option value="Viernes" />
										<option value="Sábado" />
									</datalist>
								</div>
								{errors.day && <Error message={errors.day.message} />}
								<div className="flex w-full items-center justify-between">
									<label className="border-border flex items-center justify-between rounded-lg border px-3 py-1.5">
										<Clock className="size-5" />
										<input
											type="time"
											defaultValue="06:30"
											className="size-full appearance-none px-3 py-1.5 focus:outline-none [&::-webkit-calendar-picker-indicator]:hidden"
											{...register("time_start")}
										/>
									</label>
									<div className="mx-4">
										<ArrowRight className="size-5" />
									</div>
									<label className="border-border flex items-center justify-between rounded-lg border px-3 py-1.5">
										<Clock className="size-5" />
										<input
											type="time"
											defaultValue="07:30"
											className="size-full appearance-none px-3 py-1.5 focus:outline-none [&::-webkit-calendar-picker-indicator]:hidden"
											{...register("time_end")}
										/>
									</label>
								</div>
								{errors.time_end && <Error message={errors.time_end.message} />}
								{errors.time_start && (
									<Error message={errors.time_start.message} />
								)}
								<div className="border-border flex items-center justify-between rounded-lg border px-3 py-1.5">
									<Link className="size-5" />
									<input
										type="url"
										className="size-full px-3 py-1.5 focus:outline-none"
										placeholder="https://meet.com/example"
										{...register("url")}
									/>
								</div>
								{errors.url && <Error message={errors.url.message} />}
								<div className="border-border flex items-center justify-between rounded-lg border px-3 py-1.5">
									<AlignLeft className="size-5" />
									<input
										type="text"
										className="size-full px-3 py-1.5 focus:outline-none"
										placeholder="Añadir descripción"
										{...register("description")}
									/>
								</div>
								<div className="border-border flex items-center justify-between rounded-lg border px-3 py-1.5">
									<BookType className="size-5" />
									<input
										list="cursadas"
										className="w-full appearance-none px-3 py-1.5 open:bg-red-500 focus:outline-none"
										placeholder="Añadir cursada"
										{...register("type")}
									/>
									<datalist id="cursadas">
										<option value="Teoría" />
										<option value="Práctica" />
										<option value="Laboratorio" />
									</datalist>
								</div>
								{errors.type && <Error message={errors.type.message} />}
								<div className="ml-1 flex gap-1">
									{[
										{ color: "#FF5733" },
										{ color: "#33FF57" },
										{ color: "#3357FF" },
										{ color: "#FF33A8" },
										{ color: "#FFD133" }
									].map((item, idx) => (
										<label key={idx} className="relative cursor-pointer">
											<input
												type="radio"
												className="peer sr-only"
												value={item.color}
												{...register("color")}
											/>
											<div
												className="peer-checked:ring-border size-5 rounded-full border-2 border-transparent transition-colors peer-checked:ring-2"
												style={{
													borderColor: item.color,
													backgroundColor: `${item.color}90`
												}}
											/>
										</label>
									))}
								</div>
								{errors.color && <Error message={errors.color.message} />}
								<div className="flex items-center justify-end gap-2">
									<Button form="form-created-time" type="submit">
										Guardar
									</Button>
								</div>
							</form>
						</MorphingDialogContent>
					</MorphingDialogContainer>
				</MorphingDialog>
			</header>
			<TimeCalendar />
		</section>
	)
}
