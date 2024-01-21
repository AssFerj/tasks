import prismaClient from "../../prisma";

class GetUserByEmailService{
    async execute(email: string){
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            },
            select:{
                email: true
            }
        })

        return user;
    }
}

export { GetUserByEmailService }