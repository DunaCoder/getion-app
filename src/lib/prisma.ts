import { PrismaClient } from '.prisma/client' // O desde '@prisma/client' según tu salida
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

// 1. Configura el pool de conexión nativo de JavaScript
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })

// 2. Crea el adaptador de Prisma
const adapter = new PrismaPg(pool)

// 3. Pásalo al constructor global de Prisma
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
