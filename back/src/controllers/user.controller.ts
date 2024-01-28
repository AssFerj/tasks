import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserRepository, GetUserByEmailRepository, ListUsersRepository, LoginUserRepository } from "../repository/user.repository";
import { AuthRepository } from "../repository/auth.repository/auth.repository"
import bcrypt from "bcrypt";
import { fastifyCookie } from "@fastify/cookie";

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
            const userAlreadyExist = new GetUserByEmailRepository()
            const result = await userAlreadyExist.execute(email)
            console.log(result);
            
            if(result){
                return reply.status(400).send({message: "User already exist"})
            }
            const hashPassword = bcrypt.hashSync(password, 10)
            const userRepository = new CreateUserRepository()
            const user = await userRepository.execute({
                name: name,
                email: email,
                password: hashPassword
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
            const userRepository = new ListUsersRepository()
            const users = await userRepository.execute()
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

class GetUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
            const {email} = request.params as {email: string}
            if(!email){
                return reply.status(404).send({message: "Missing required field: E-mail"})
            }
            const userRepository = new GetUserByEmailRepository()
            const user = await userRepository.execute(email)
            if(!user){
                return reply.status(404).send({message: "User not found"})
            }
            return reply.status(201).send({
                ok: true,
                message: "User listted successfully",
                data: user
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class LoginUserController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
            // const csrfToken = await reply.generateCsrf()
            // if(!csrfToken){
            //     return reply.status(401).send({message: "Unauthorized"})
            // }
            const {email, password} = request.body as {email: string, password: string}
            if(!email){
                return reply.status(404).send({message: "Missing required field: E-mail"})
            }
            if(!password){
                return reply.status(404).send({message: "Missing required field: Password"})
            }
            const userRepository = new LoginUserRepository()
            const loggedUser = await userRepository.execute(email)
            if(!loggedUser){
                return reply.status(401).send({message: "Invalid credentials"})
            }
            const decodePassword = bcrypt.compareSync(password, loggedUser.password)
            if(!decodePassword){
                return reply.status(401).send({message: "Invalid credentials"})
            }
            const token = new AuthRepository().createToken({
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
                    // csrfToken: csrfToken,
                    token
                }
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

export { CreateUserController, GetUserController, ListUsersController, LoginUserController }