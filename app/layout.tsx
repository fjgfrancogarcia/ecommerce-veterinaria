import type { Metadata } from "next";
import { Geist as GeistSans, Geist_Mono as GeistMono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = GeistSans({ subsets: ["latin"] });
const geistMono = GeistMono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VillaVet - Veterinaria y Productos para Mascotas",
  description: "Encuentra todo lo que tu mascota necesita en un solo lugar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
