import prismaClient from "../../prisma";

export interface IUpdateTaskProps {
    userId: string, 
    taskId: string, 
    description: string, 
    status?: boolean
}

class UpdateTaskService{
    async execute(data: IUpdateTaskProps){
        const task = await prismaClient.task.update({
            where:{
                id: data.taskId,
                user_id: data.userId
            },
            data:{
                description: data.description,
                status: data.status
            }
        })

        return task;
    }
}

export {UpdateTaskService}