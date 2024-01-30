import fastify from 'fastify'
import { signupController, signinController } from './controllers/auth'

const app = fastify()

signupController(app)
signinController(app)

app.listen({ port: 4000, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
