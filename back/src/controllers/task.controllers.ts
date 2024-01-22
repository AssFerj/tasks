import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTaskService } from "../services/task.services/add.task.service";
import { ListTasksService } from "../services/task.services/list.tasks.service";
import { DeleteTaskService } from "../services/task.services/delete.task.service";
import { UpdateTaskService } from "../services/task.services/update.task.service";

class CreateTaskController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
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
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class ListTasksController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
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
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class UpdateTaskController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
            const {userId, taskId} = request.params as {userId: string, taskId: string}
            const {description} = request.body as {description: string}
            if(!userId){
                return reply.status(400).send({message: "User not found"})
            }
            if(!taskId){
                return reply.status(400).send({message: "Task not found"})
            }
            if(!description){
                return reply.status(400).send({message: "Missing required field: Description"})
            }
            const taskService = new UpdateTaskService()
            const updatedTask = await taskService.execute({userId, taskId, description})
            return reply.status(201).send({
                ok: true,
                message: "Task updated successfully",
                data: updatedTask
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

class DeleteTaskController{
    async handle(request: FastifyRequest, reply: FastifyReply){
        try {
            const {userId, taskId} = request.params as {userId: string, taskId: string}
            if(!userId){
                return reply.status(400).send({message: "Missing required field: User Id"})
            }
            if(!taskId){
                return reply.status(400).send({message: "Missing required field: Task Id"})
            }
            const taskService = new DeleteTaskService()
            const deletedTask = await taskService.execute(userId, taskId)
            return reply.status(201).send({
                ok: true,
                message: "Task deleted successfully",
                data: deletedTask
            })
        } catch (error) {
            return reply.status(500).send({message: "Internal server error"})
        }
    }
}

export { CreateTaskController, ListTasksController, UpdateTaskController, DeleteTaskController }