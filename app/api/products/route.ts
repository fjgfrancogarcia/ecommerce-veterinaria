import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";

// GET /api/products - Obtener todos los productos
export async function GET(request: Request) {
  try {
    console.log("Obteniendo productos...");
    
    // Obtener parámetros de la URL
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;
    const category = searchParams.get('category');
    
    // Construir la consulta
    const whereClause = category ? { category } : {};
    
    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc',
      },
      ...(limit ? { take: limit } : {}),
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json(
      { error: "Error al cargar los productos" },
      { status: 500 }
    );
  }
}

// POST /api/products - Crear un nuevo producto
export async function POST(request: Request) {
  try {
    // Verificar autenticación
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validar datos
    if (!body.name || !body.category || body.price === undefined || body.stock === undefined) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Crear el producto
    const product = await prisma.product.create({
      data: {
        name: body.name,
        category: body.category,
        price: parseFloat(body.price),
        stock: parseInt(body.stock),
        description: body.description || null,
        imageUrl: body.imageUrl || null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 }
    );
  }
} 