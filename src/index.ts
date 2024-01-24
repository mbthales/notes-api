import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const main = async () => {
	const user = await prisma.user.create({
		data: {
			username: 'thales',
			password: 'teste',
		},
	})

	console.log(user)
}

main()
