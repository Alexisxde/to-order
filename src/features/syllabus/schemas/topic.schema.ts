import { z } from "zod"

export const topicSchema = z.object({
	name: z.string().min(1, "El nombre del tema es requerido").max(100, "El nombre es demasiado largo"),
	subjectId: z.string().uuid("ID de asignatura inválido")
})

export const updateTopicSchema = topicSchema.partial()
