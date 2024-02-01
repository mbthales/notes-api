import fastify from 'fastify'
import { signupController, signinController } from './controllers/auth'
import {
	createNoteController,
	getUserNotesController,
} from './controllers/note'

const app = fastify()

signupController(app)
signinController(app)
createNoteController(app)
getUserNotesController(app)

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
