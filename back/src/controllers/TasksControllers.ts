import { FastifyRequest, FastifyReply } from 'fastify'
import { CreateTaskService } from '../services/CreateTaskService'

export class CreateTaskController {
  async handle(request: FastifyRequest, response: FastifyReply) {
    const { description, status, user_id } = request.body as { description: string, status: boolean, user_id: string }

    const createTaskService = new CreateTaskService()

    const task = await createTaskService.execute(description, status, user_id)

    return response.status(201).send(task)
  }
}