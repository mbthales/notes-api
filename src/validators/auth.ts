import { z } from 'zod'

export const authSchema = z.object({
	username: z.string().trim().toLowerCase().min(3).max(10),
	password: z.string().trim().min(6),
})
