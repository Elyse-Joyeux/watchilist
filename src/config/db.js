import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query,", "error", "warn"] : ["error"],
})

const connection = async () =>{
    try{
        await prisma.$connect()
        console.log("DB connected via Prisma")
    }catch(){

    }
}b