import { PrismaClient } from "@prisma/client";

// evita abrir varias conexoes no hot reload do next
const globalComPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

export const banco = globalComPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalComPrisma.prisma = banco;
}
