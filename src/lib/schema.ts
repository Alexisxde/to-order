import { z } from "zod"

export const formSchemaEventCreate = z.object({
	title: z.string().min(1, { message: "El título es obligatorio." }),
	description: z.string().optional()
})
