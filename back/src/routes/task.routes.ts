import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { CreateUserController, DeleteUserController, ListUsersController } from '../controllers/user.controller'

export async function taskRoutes(fastfy: FastifyInstance) {
    fastfy.get('/user/:userId/task', (request: FastifyRequest, reply: FastifyReply) => {
        return new ListUsersController().handle(request, reply)
    })

    fastfy.post('/user/:userId/task', (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply)
    })

    fastfy.delete('/user/:userId/task/:taskId', (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteUserController().handle(request, reply)
    })
}