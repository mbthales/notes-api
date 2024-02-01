import { prisma } from '../../prisma'

import { CreateNoteI } from '../interfaces/note'

export const createNoteRepository = async (data: CreateNoteI) => {
	const note = await prisma.note.create({
		data,
	})

	return note
}

export const getUserNotesRepository = async (userId: string) => {
	const notes = await prisma.note.findMany({
		where: {
			userId,
		},
	})

	return notes
}
