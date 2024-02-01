import type { FastifyReply } from 'fastify'

import { noteSchema } from '../validators/note'
import {
	createNoteRepository,
	getUserNotesRepository,
} from '../repositories/note'

export const createNoteService = async (body: unknown, reply: FastifyReply) => {
	try {
		const validatedBody = noteSchema.safeParse(body)

		if (!validatedBody.success) {
			return reply.status(400).send({
				error: 'Invalid body',
				details: validatedBody.error.issues,
			})
		}

		await createNoteRepository(validatedBody.data)

		return reply.status(201).send({
			msg: 'Note created',
		})
	} catch (err) {
		console.error(err)

		return reply.status(201).send({
			msg: 'Internal server error',
		})
	}
}

export const getUserNotesService = async (
	body: unknown,
	reply: FastifyReply
) => {
	try {
		const userId = (body as { userId: string }).userId

		const notes = await getUserNotesRepository(userId)

		return reply.status(200).send({
			data: notes,
		})
	} catch (err) {
		console.error(err)

		return reply.status(500).send({
			error: 'Internal server error',
		})
	}
}
