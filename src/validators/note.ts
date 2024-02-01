import { z } from 'zod'

export const noteSchema = z.object({
	title: z.string().trim().min(3).max(15),
	content: z.string().trim(),
	userId: z.string().cuid(),
})
