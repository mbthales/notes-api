import { SignJWT } from 'jose'

export const createJwtToken = async (username: string, userId: string) => {
	const secret = new TextEncoder().encode(process.env.JWT_SECRET)
	const token = await new SignJWT({ username, userId })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('30d')
		.sign(secret)

	return token
}
