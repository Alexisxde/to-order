import { z } from "zod"

export const formSchemaProject = z.object({
	name: z.string().min(1, "Título es requerido"),
	description: z.string().optional()
})
