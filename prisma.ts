import { PrismaClient } from '../db/generate/prisma'

// создаём расширенный клиент
const prismaClient = new PrismaClient()
type CustomPrismaClient = typeof prismaClient
export const runtime = "nodejs";

declare global {
  // eslint-disable-next-line no-var
  var prisma: CustomPrismaClient | undefined
}

const prisma = globalThis.prisma ?? prismaClient

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}
if (typeof window !== "undefined") {
  throw new Error("Prisma Client должен использоваться только на сервере")
}
export default prisma
