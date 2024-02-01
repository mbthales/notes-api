import { decodeJwtToken } from '../utils/jwt'

import type { FastifyRequest, FastifyReply } from 'fastify'

export const authMiddleware = async (
	req: FastifyRequest,
	reply: FastifyReply
) => {
	const token = req.headers.authorization?.split(' ')[1]
	const params = req.params as { userId: string }
	const userId = params.userId

	if (!token) {
		return reply.status(401).send({
			error: 'Unauthorized',
		})
	}

	const decodedToken = await decodeJwtToken(token)

	if (!decodedToken) {
		return reply.status(401).send({
			error: 'Unauthorized',
		})
	}

	const tokenPayload = decodedToken.payload

	if (tokenPayload.userId !== userId) {
		return reply.status(401).send({
			error: 'Unauthorized',
		})
	}

	req.body = Object.assign({}, req.body, { userId: tokenPayload.userId })
}
