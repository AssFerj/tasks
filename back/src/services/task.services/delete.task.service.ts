import prismaClient from "../../prisma";

class DeleteTaskService{
    async execute(userId: string, taskId: string){
        if(!userId){
            throw new Error("User not found");
        }
        if(!taskId){
            throw new Error("Task not found");
        }
        const deletedTask = await prismaClient.task.delete({
            where:{
                id: taskId,
                user_id: userId
            }
        })
        return deletedTask;
    }
}

export { DeleteTaskService }