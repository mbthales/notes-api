import { prisma } from '../../prisma'

import { CreateNoteI } from '../interfaces/note'

export const createNoteRepository = async (data: CreateNoteI) => {
	return await prisma.note.create({
		data,
	})
}

export const getUserNotesRepository = async (userId: string) => {
	return await prisma.note.findMany({
		where: {
			userId,
		},
	})
}
