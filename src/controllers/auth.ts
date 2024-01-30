import type { FastifyInstance } from 'fastify'

import { signupService, signinService } from '../services/auth'

export const signupController = (app: FastifyInstance) => {
	app.post('/signup', async (req, reply) => {
		return await signupService(req.body, reply)
	})
}

export const signinController = (app: FastifyInstance) => {
	app.post('/signin', async (req, reply) => {
		return await signinService(req.body, reply)
	})
}
