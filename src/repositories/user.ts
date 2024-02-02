import { prisma } from '../../prisma'

import type { CreateUserI } from '../interfaces/user'

export const createUserRepository = async (data: CreateUserI) => {
	return await prisma.user.create({
		data,
	})
}

export const findUserByUsernameRepository = async (username: string) => {
	return await prisma.user.findUnique({
		where: {
			username,
		},
	})
}
