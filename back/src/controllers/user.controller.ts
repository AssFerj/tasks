import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserService } from "../services/user.services/add.user.service";
import { ListUsersService } from "../services/user.services/list.users.service";
import { DeleteUserService } from "../services/user.services/delete.user.service";


class CreateUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {name, email, password} = request.body as {name: string, email: string, password: string}
        if(!name){
            return reply.status(400).send({message: "Missing required field: Name"})
        }
        if(!email){
            return reply.status(400).send({message: "Missing required field: E-mail"})
        }
        if(!password){
            return reply.status(400).send({message: "Missing required field: Password"})
        }
        const userService = new CreateUserService()
        const user = await userService.execute({
            name: name,
            email: email,
            password: password
        })
        return reply.status(201).send({
            ok: true,
            message: "User created successfully",
            data: user
        })
    }
}

class ListUsersController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const userService = new ListUsersService()
        const users = await userService.execute()
        return reply.status(201).send({
            ok: true,
            message: "Users listted successfully",
            data: users
        })
    }
}

class DeleteUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {userId} = request.params as {userId: string}
        if(!userId){
            return reply.status(400).send({message: "Missing required field: Id"})
        }
        const userService = new DeleteUserService()
        const deletedUser = await userService.execute(userId)
        return reply.status(201).send({
            ok: true,
            message: "User deleted successfully",
            data: deletedUser
        })
    }
}

export { CreateUserController, ListUsersController, DeleteUserController }