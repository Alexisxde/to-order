import { z } from "zod"

export const create = z.object({ name: z.string().min(4, "No puede estar vacío.") })

export default { create }
