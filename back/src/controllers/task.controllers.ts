import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTaskService } from "../services/task.services/add.task.service";
import { ListTasksService } from "../services/task.services/list.tasks.service";



class CreateTaskController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        const {userId} = request.params as {userId: string}
        const {description} = request.body as {description: string, status: string, user_id: string}
        if(!userId){
            return reply.status(400).send({message: "User not found"})
        }
        if(!description){
            return reply.status(400).send({message: "Missing required field: Description"})
        }
        const taskService = new CreateTaskService()
        const task = await taskService.execute({userId, description})
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
        if(!userId){
            return reply.status(400).send({message: "User not found"})
        }
        const taskService = new ListTasksService()
        const tasks = await taskService.execute(userId)
        return reply.status(201).send({
            ok: true,
            message: "Tasks listted successfully",
            data: tasks
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