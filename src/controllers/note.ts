import { createNoteService, getUserNotesService } from '../services/note'
import { authMiddleware } from '../middlewares/auth'

import type { FastifyInstance } from 'fastify'

export const createNoteController = async (app: FastifyInstance) => {
	app.post(
		'/user/:userId/note',
		{ preHandler: authMiddleware },
		async (request, reply) => {
			return await createNoteService(request.body, reply)
		}
	)
}

export const getUserNotesController = async (app: FastifyInstance) => {
	app.get(
		'/user/:userId/note',
		{ preHandler: authMiddleware },
		async (request, reply) => {
			return await getUserNotesService(request.body, reply)
		}
	)
}
