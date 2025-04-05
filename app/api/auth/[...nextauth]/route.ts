import NextAuth from "next-auth";
import { authOptions } from "./options";

// Este handler se exporta como GET y POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 