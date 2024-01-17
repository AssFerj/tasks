import prismaclient from "../prisma";

class CreateTaskService {
    async execute(description: string, status: boolean, user_id: string) {
        const message = await prismaclient.task.create({
            data: {
                description,
                status,
                user_id,
            },
            include: {
                user: true
            }
        });

        return message;
    }
}

export { CreateTaskService }