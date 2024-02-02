import { signupController, signinController } from './controllers/auth'
import {
	createNoteController,
	getUserNotesController,
} from './controllers/note'

import type { FastifyInstance } from 'fastify'

export const routes = async (app: FastifyInstance) => {
	signupController(app)
	signinController(app)
	createNoteController(app)
	getUserNotesController(app)
}
