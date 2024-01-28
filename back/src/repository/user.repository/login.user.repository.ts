import prismaClient from "../../prisma";

class LoginUserRepository{
    async execute(email: string){
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        return user;
    }
}

export {LoginUserRepository}