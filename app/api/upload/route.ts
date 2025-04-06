import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

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

    // Procesar la solicitud como FormData
    const formData = await request.formData();
    const file = formData.get('file') as File;

    // Validar que se haya enviado un archivo
    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo" },
        { status: 400 }
      );
    }

    // Verificar que sea una imagen
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: "El archivo debe ser una imagen" },
        { status: 400 }
      );
    }

    // Obtener la extensión del archivo
    const fileExtension = file.name.split('.').pop() || '';
    
    // Generar un nombre único para el archivo
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Ruta donde se guardará la imagen
    const publicDirectory = join(process.cwd(), 'public');
    const uploadsDirectory = join(publicDirectory, 'uploads');
    const filePath = join(uploadsDirectory, fileName);
    
    // Convertir el archivo a un Buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Escribir el archivo en el sistema de archivos
    await writeFile(filePath, buffer);
    
    // Construir la URL para acceder a la imagen
    const imageUrl = `/uploads/${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      url: imageUrl 
    });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    return NextResponse.json(
      { error: "Error al procesar la subida de archivos" },
      { status: 500 }
    );
  }
} 