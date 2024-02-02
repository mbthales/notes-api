import { hash, compare } from 'bcryptjs'

import { authSchema } from '../validators/auth'
import {
	findUserByUsernameRepository,
	createUserRepository,
} from '../repositories/user'
import { createJwtToken } from '../utils/jwt'

import type { FastifyReply } from 'fastify'

export const signupService = async (body: unknown, reply: FastifyReply) => {
	try {
		const validatedBody = authSchema.safeParse(body)

		if (!validatedBody.success) {
			return reply.status(400).send({
				error: 'Invalid body',
				details: validatedBody.error.issues,
			})
		}

		const { username, password } = validatedBody.data

		const user = await findUserByUsernameRepository(username)

		if (user) {
			return reply.status(409).send({
				error: 'Username already exists',
			})
		}

		const hashedPassword = await hash(password, 10)

		await createUserRepository({
			username,
			password: hashedPassword,
		})

		reply.status(201).send({
			msg: 'User created',
		})
	} catch (err) {
		console.error(err)

		reply.status(500).send({
			error: 'Internal server error',
		})
	}
}

export const signinService = async (body: unknown, reply: FastifyReply) => {
	try {
		const validatedBody = authSchema.safeParse(body)

		if (!validatedBody.success) {
			return reply.status(400).send({
				error: 'Invalid body',
				details: validatedBody.error.issues,
			})
		}

		const { username, password } = validatedBody.data

		const user = await findUserByUsernameRepository(username)

		if (!user) {
			return reply.status(401).send({
				error: 'Invalid credentials',
			})
		}

		const isPasswordValid = await compare(password, user.password)

		if (!isPasswordValid) {
			reply.status(401).send({
				error: 'Invalid credentials',
			})

			return
		}

		const token = await createJwtToken(username, user.id)

		reply.headers({
			authorization: `Bearer ${token}`,
		})

		reply.status(200).send({
			msg: 'User authenticated',
		})
	} catch (err) {
		console.error(err)

		reply.status(500).send({
			error: 'Internal server error',
		})
	}
}
