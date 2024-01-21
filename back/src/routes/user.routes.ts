import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { CreateUserController, DeleteUserController, ListUsersController, LoginUserController } from '../controllers/user.controller'

export async function userRoutes(fastfy: FastifyInstance) {
    fastfy.get('/user', (request: FastifyRequest, reply: FastifyReply) => {
        return new ListUsersController().handle(request, reply)
    })

    fastfy.post('/user', (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateUserController().handle(request, reply)
    })

    fastfy.delete('/user/:userId', (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteUserController().handle(request, reply)
    })
    
    fastfy.post('/login', (request: FastifyRequest, reply: FastifyReply) => {
        return new LoginUserController().handle(request, reply)
    })
}