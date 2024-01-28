import { hash } from 'bcryptjs'
import { Prisma } from '@prisma/client'

import { signupSchema } from '../validators/auth'
import { createUserRepository } from '../repositories/user'

import type { FastifyReply } from 'fastify'

export const signupService = async (body: unknown, reply: FastifyReply) => {
	try {
		const validatedBody = signupSchema.safeParse(body)

		if (!validatedBody.success) {
			reply.status(400).send({
				error: 'Invalid body',
				details: validatedBody.error.issues,
			})

			return
		}

		const { username, password } = validatedBody.data

		const hashedPassword = await hash(password, 10)

		await createUserRepository({
			username,
			password: hashedPassword,
		})

		reply.status(201).send({
			msg: 'User created',
		})
	} catch (err) {
		if (err instanceof Prisma.PrismaClientKnownRequestError) {
			if (err.code === 'P2002') {
				reply.status(409).send({
					err: 'Username already exists',
				})

				return
			}
		}

		console.error(err)

		reply.status(500).send({
			error: 'Internal server error',
		})
	}
}
