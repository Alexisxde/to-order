import { z } from "zod"

const dayEnum = z.enum(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"])
const colorEnum = z.enum(["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFD133"])
const typeEnum = z.enum(["Teoría", "Laboratorio", "Práctica", "Tutoria"])

export const timeCreateSchema = z
	.object({
		subject: z.string().min(1, "La materia es requerida").max(100, "El nombre de la materia es demasiado largo"),
		description: z.string().max(500, "La descripción es demasiado larga").optional(),
		day: dayEnum,
		color: colorEnum,
		url: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
		type: typeEnum,
		time_start: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de hora inválido (HH:mm)"),
		time_end: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de hora inválido (HH:mm)")
	})
	.refine(
		(data) => {
			const start = data.time_start.split(":").map(Number)
			const end = data.time_end.split(":").map(Number)
			const startTime = start[0] * 60 + start[1]
			const endTime = end[0] * 60 + end[1]
			return endTime > startTime
		},
		{
			message: "La hora de fin debe ser posterior a la hora de inicio",
			path: ["time_end"]
		}
	)

export const timeUpdateSchema = timeCreateSchema.optional()

export default { create: timeCreateSchema, update: timeUpdateSchema }
