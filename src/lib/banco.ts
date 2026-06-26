import { PrismaClient } from "@prisma/client";

// conexao com o postgres via prisma
export const banco = new PrismaClient();
