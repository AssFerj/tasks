import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateTaskController } from "./controllers/TasksControllers";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
        return { hello: "world" };
    })

    fastify.post("/task", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateTaskController().handle(request, reply)
    })
}