import Fastify from 'fastify'
import cors from '@fastify/cors'
import { userRoutes } from './routes/user.routes'
import { taskRoutes } from './routes/task.routes'

const app = Fastify({logger: true})

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({
        message: error.message
    })
})

const start = async () => {
    await app.register(cors)
    await app.register(userRoutes)
    await app.register(taskRoutes)
    try {
        await app.listen({port: 3333})
    } catch (error) {
        app.log.error(error)
        process.exit(1)
    }
}

start();