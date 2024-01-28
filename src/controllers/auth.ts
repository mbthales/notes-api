import type { FastifyInstance } from 'fastify'

import { signupService } from '../services/auth'

export const signupController = (app: FastifyInstance) => {
	app.post('/signup', async (req, reply) => {
		return await signupService(req.body, reply)
	})
}
