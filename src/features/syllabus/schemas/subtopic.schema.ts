import { z } from "zod"

export const subtopicSchema = z.object({
	name: z.string().min(1, "El nombre del subtema es requerido").max(100, "El nombre es demasiado largo"),
	topicId: z.string().uuid("ID de tema inválido")
})

export const updateSubtopicSchema = z.object({
	name: z.string().min(1, "El nombre del subtema es requerido").max(100, "El nombre es demasiado largo").optional(),
	completed: z.boolean().optional()
})
