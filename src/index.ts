import fastify from 'fastify'

import { routes } from './routes'

const app = fastify()

routes(app)

app.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
