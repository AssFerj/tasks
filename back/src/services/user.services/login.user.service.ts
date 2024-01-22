import prismaClient from "../../prisma";

export interface ILoginProps{
    email: string,
    password: string
}

class LoginUserService{
    async execute(loginData: ILoginProps){
        const user = await prismaClient.user.findFirst({
            where:{
                email: loginData.email,
                password: loginData.password
            }
        })
        return user;
    }
}

export {LoginUserService}