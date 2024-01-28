import prismaClient from "../../prisma";

class ListUsersRepository{
    async execute(){
        const users = await prismaClient.user.findMany()

        return users;
    }
}

export { ListUsersRepository }