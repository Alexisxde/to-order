import { z } from "zod"

export default z.object({
	title: z.string().min(1, "El título es requerido").max(100, "El título es demasiado largo").optional(),
	description: z.string().max(500, "la descripción es demasiado larga").optional(),
	priority: z.enum(["low", "medium", "high"]).optional(),
	column: z.enum(["todo", "in-progress", "review", "done"]).optional()
})
