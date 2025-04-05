const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Verificar si ya existe un usuario con este email
  const existingUser = await prisma.user.findUnique({
    where: {
      email: 'admin@villavet.com',
    },
  });

  if (!existingUser) {
    // Crear usuario admin si no existe
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@villavet.com',
        name: 'Administrador',
        hashedPassword,
        role: 'admin',
      },
    });
    
    console.log(`Usuario admin creado con ID: ${admin.id}`);
  } else {
    console.log('El usuario admin ya existe');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 