import { z } from "zod"

export const formSchemaEventCreate = z.object({
	title: z.string().min(1, { message: "El título es obligatorio." }),
	description: z.string().optional()
})

const timeToMinutes = (time: string) => {
	const [hours, minutes] = time.split(":").map(Number)
	return hours * 60 + minutes
}

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

export const createTimeShema = z
	.object({
		subject: z.string().min(5, "No puede estar vacío."),
		description: z.string().optional(),
		day: z.enum(
			["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
			{ errorMap: () => ({ message: "Día invalido." }) }
		),
		color: z.enum(["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFD133"], {
			errorMap: () => ({ message: "Color invalido." })
		}),
		url: z.string().optional(),
		type: z.enum(["Teoría", "Laboratorio", "Práctica"], {
			errorMap: () => ({ message: "Tipo inválido." })
		}),
		time_start: z
			.string()
			.regex(timeRegex, { message: "Hora de inicio inválida." })
			.refine(
				t => {
					const mins = timeToMinutes(t)
					return mins >= 360 && mins <= 1320
				},
				{ message: "El horario debe estar entre las 06:00 y 22:00." }
			),
		time_end: z
			.string()
			.regex(timeRegex, { message: "Hora de fin inválida." })
			.refine(
				t => {
					const mins = timeToMinutes(t)
					return mins >= 360 && mins <= 1320
				},
				{ message: "El horario debe estar entre las 06:00 y 22:00." }
			)
	})
	.refine(
		data => {
			return timeToMinutes(data.time_start) < timeToMinutes(data.time_end)
		},
		{
			message: "El horario de inicio debe ser menor al de fin.",
			path: ["time_end"]
		}
	)
