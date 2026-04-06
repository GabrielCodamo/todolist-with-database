import "dotenv/config";
import { PrismaClient } from '../../generated/prisma/client'
import { PrismaPg } from '../../node_modules/@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }
