import "dotenv/config";
import { Pool } from 'pg';
import { PrismaClient } from '../../generated/prisma/client'
import { PrismaPg } from '../../node_modules/@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`

// Configuração usando apenas o pacote 'pg'
const pool = new Pool({
    connectionString,
    ssl: {
        // Isso ignora a validação do certificado que causa o erro na Vercel
        rejectUnauthorized: false
    }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adapter = new PrismaPg(pool as any);
export const prisma = new PrismaClient({ adapter });