import { prisma } from '../../prisma'

import type { CreateUserI } from '../interfaces/user'

export const createUserRepository = async (data: CreateUserI) => {
	const user = await prisma.user.create({
		data,
	})

	return user
}

export const findUserByUsernameRepository = async (username: string) => {
	const user = await prisma.user.findUnique({
		where: {
			username,
		},
	})

	return user
}
