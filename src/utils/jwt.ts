import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export const createJwtToken = async (username: string, userId: string) => {
	return await new SignJWT({ username, userId })
		.setProtectedHeader({ alg: 'HS256' })
		.setIssuedAt()
		.setExpirationTime('30d')
		.sign(secret)
}

export const decodeJwtToken = async (token: string) => {
	try {
		return await jwtVerify(token, secret)
	} catch (err) {
		return null
	}
}
