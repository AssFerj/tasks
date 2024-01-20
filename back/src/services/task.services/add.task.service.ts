import prismaClient from "../../prisma";

export interface ICreateTaskProps{
    userId: string
    description: string
}

class CreateTaskService{
    async execute(task: ICreateTaskProps){
        if(!task.description){
            throw new Error("Missing parameters");
        }

        const user = await prismaClient.user.findFirst({
            where:{
                id: task.userId
            }
        })

        if(!user){
            throw new Error("User not found");
        }
    
        const newTask = await prismaClient.task.create({
            data:{
                description: task.description,
                status: false,
                user_id: task.userId
            },
            select:{
                id: true,
                description: true,
                status: true,
                user_id: true
            }
        })

        // const addTaskToUser = await prismaClient.user.update({
        //     where:{
        //         id: task.user_id
        //     },
        //     data:{
        //         tasks:{
        //             connect:{
        //                 id: newTask.id
        //             }
        //         }
        //     }
        // })

        return newTask;
    }
}

export { CreateTaskService }