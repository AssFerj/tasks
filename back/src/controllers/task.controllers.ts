import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTaskService } from "../services/task.services/add.task.service";



class CreateTaskController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {userId} = request.params as {userId: string}
        const {description, user_id} = request.params as {description: string, status: string, user_id: string}
        if(!userId){
            return reply.status(400).send({message: "User not found"})
        }
        if(!description){
            return reply.status(400).send({message: "Missing required field: Description"})
        }
        if(!user_id){
            return reply.status(400).send({message: "Missing required field: User ID"})
        }
        const taskService = new CreateTaskService()
        const task = await taskService.execute({userId, description, user_id})
        return reply.status(201).send({
            ok: true,
            message: "Task created successfully",
            data: task
        })
    }
}

class ListTasksController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {userId} = request.params as {userId: string}
        const {taskId} = request.params as {taskId: string}

        return reply.status(201).send({
            ok: true,
            message: "Tasks listted successfully",
            data: {}
        })
    }
}

class DeleteTaskController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {userId} = request.params as {userId: string}
        const {taskId} = request.params as {taskId: string}
        if(!userId){
            return reply.status(400).send({message: "Missing required field: Id"})
        }
        
        return reply.status(201).send({
            ok: true,
            message: "Task deleted successfully",
            data: {}
        })
    }
}

export { CreateTaskController, ListTasksController, DeleteTaskController }