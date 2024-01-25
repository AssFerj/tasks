import prismaClient from "../../prisma";

class GetUserByEmailService{
    async execute(email: string){
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        return {
            id: user?.id,
            name: user?.name,
            email: user?.email
        };
    }
}

export { GetUserByEmailService }