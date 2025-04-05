import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Credenciales incompletas");
          return null;
        }

        try {
          // Buscar al usuario en la base de datos
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          // Si no existe el usuario o la contraseña es incorrecta
          if (!user || !user.hashedPassword) {
            console.log(`Usuario no encontrado: ${credentials.email}`);
            return null;
          }

          // Verificar la contraseña
          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!passwordMatch) {
            console.log(`Contraseña inválida para: ${credentials.email}`);
            return null;
          }

          console.log(`Inicio de sesión exitoso: ${credentials.email}`);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Error en authorize:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 