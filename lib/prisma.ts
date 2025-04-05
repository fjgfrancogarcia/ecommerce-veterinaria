import { PrismaClient } from '@prisma/client';

// Declara una variable global para PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

// Utiliza la variable global para guardar la conexión entre recargas de desarrollo
export const prisma = global.prisma || new PrismaClient();

// En desarrollo, asigna el cliente a la variable global para evitar
// múltiples instancias del cliente durante hot-reloading
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
} 