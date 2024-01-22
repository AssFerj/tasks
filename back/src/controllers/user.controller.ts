import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserService, DeleteUserService, GetUserByEmailService, ListUsersService, LoginUserService } from "../services/user.services";
import { JwtService } from "../services/auth.service/auth.service";

class CreateUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
            const {name, email, password} = request.body as {name: string, email: string, password: string}
            if(!name){
                return reply.status(404).send({message: "Missing required field: Name"})
            }
            if(!email){
                return reply.status(404).send({message: "Missing required field: E-mail"})
            }
            if(!password){
                return reply.status(404).send({message: "Missing required field: Password"})
            }
            const userAlreadyExist = new GetUserByEmailService()
            const result = await userAlreadyExist.execute(email)
            if(result){
                return reply.status(400).send({message: "User already exist"})
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
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class ListUsersController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
            const userService = new ListUsersService()
            const users = await userService.execute()
            return reply.status(201).send({
                ok: true,
                message: "Users listted successfully",
                data: users.map(user => {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        createdAt: user.created_at,
                        updatedAt: user.updated_at
                    }
                })
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class DeleteUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
            const {userId} = request.params as {userId: string}
            if(!userId){
                return reply.status(404).send({message: "Missing required field: Id"})
            }
            const userService = new DeleteUserService()
            const deletedUser = await userService.execute(userId)
            return reply.status(201).send({
                ok: true,
                message: "User deleted successfully",
                data: {
                    id: deletedUser.id,
                    name: deletedUser.name,
                    email: deletedUser.email
                }
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class LoginUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
            const {email, password} = request.body as {email: string, password: string}
            if(!email){
                return reply.status(404).send({message: "Missing required field: E-mail"})
            }
            if(!password){
                return reply.status(404).send({message: "Missing required field: Password"})
            }
            const userService = new LoginUserService()
            const loggedUser = await userService.execute({
                email: email,
                password: password
            })
            if(!loggedUser){
                return reply.status(401).send({message: "Invalid credentials"})
            }
            if(loggedUser.password !== password){
                return reply.status(401).send({message: "Invalid credentials"})
            }
            const token = new JwtService().createToken({
                id: loggedUser.id,
                name: loggedUser.name,
                email: loggedUser.email
            })
            return reply.status(201).send({
                ok: true,
                message: "User logged successfully",
                data: {
                    id: loggedUser.id,
                    name: loggedUser.name,
                    email: loggedUser.email,
                    token
                }
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

export { CreateUserController, ListUsersController, DeleteUserController, LoginUserController }