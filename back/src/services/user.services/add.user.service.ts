import prismaClient from "../../prisma";

export interface ICreateUserProps{
    name: string, 
    email: string, 
    password: string
}

class CreateUserService{
    async execute(user: ICreateUserProps){
        if(!user.name || !user.email || !user.password){
            throw new Error("Missing parameters");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: user.email
            }
        })

        if(userAlreadyExists){
            throw new Error("User already exists");
        }
        
        /// Fazer o hash da senha
    
        const newUser = await prismaClient.user.create({
            data:{
                name: user.name,
                email: user.email,
                password: user.password //passar hash da senha
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return newUser;
    }
}

export { CreateUserService }