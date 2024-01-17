import Fastify from 'fastify'
import cors from '@fastify/cors'
import { routes } from './routes'

const app = Fastify({logger: true})

const start = async () => {
    await app.register(cors, {origin: true})
    await app.register(routes)
    try {
        await app.listen({port: 3333})
    } catch (error) {
        app.log.error(error)
        process.exit(1)
    }

}

start().then(() => console.log('server running'))