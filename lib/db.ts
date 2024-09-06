import { PrismaClient } from '@prisma/client';

// Declaración global para el objeto prismaClient.
declare global {
    var prismaClient: PrismaClient | undefined;
  }

// Función para crear una instancia de PrismaClient
function createPrismaClient(): PrismaClient {
  if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient({
    });
  }
  return globalThis.prismaClient;
}

// Exporta la instancia de PrismaClient creada.
export const db = createPrismaClient();
