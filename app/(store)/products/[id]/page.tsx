"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Definimos el tipo para nuestros productos
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Obtener producto de la API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Producto no encontrado");
          }
          throw new Error("Error al cargar el producto");
        }
        
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(err.message || "No se pudo cargar el producto. Intente nuevamente.");
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Manejar cambio de cantidad
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  // Manejar añadir al carrito
  const handleAddToCart = () => {
    // Aquí iría la lógica para añadir al carrito
    alert(`${quantity} ${product?.name} añadido al carrito`);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
        <div className="mt-6">
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-500"
          >
            &larr; Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-20">
          <p className="text-gray-500">Producto no encontrado</p>
        </div>
        <div className="mt-6">
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-500"
          >
            &larr; Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumbs */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              Inicio
            </Link>
          </li>
          <li className="flex items-center">
            <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <Link href="/products" className="ml-2 text-gray-400 hover:text-gray-500">
              Productos
            </Link>
          </li>
          <li className="flex items-center">
            <svg className="flex-shrink-0 h-5 w-5 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
            <span className="ml-2 text-gray-500" aria-current="page">
              {product.name}
            </span>
          </li>
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product image */}
        <div className="lg:max-w-lg lg:self-start">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-center object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Sin imagen</span>
              </div>
            )}
          </div>
        </div>

        {/* Product details */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
          
          <div className="mt-3">
            <h2 className="sr-only">Información del producto</h2>
            <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Descripción</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product.description || "Sin descripción"}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <h3 className="text-sm text-gray-600 font-medium">Categoría:</h3>
              <p className="ml-2 text-sm text-gray-500">{product.category}</p>
            </div>
            <div className="flex items-center mt-2">
              <h3 className="text-sm text-gray-600 font-medium">Disponibilidad:</h3>
              <p className="ml-2 text-sm text-gray-500">{product.stock > 0 ? `${product.stock} en stock` : "Agotado"}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center">
              <h3 className="text-sm text-gray-600 font-medium">Cantidad:</h3>
              <select
                id="quantity"
                name="quantity"
                className="ml-2 rounded-md border border-gray-300 py-1.5 text-base text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                value={quantity}
                onChange={handleQuantityChange}
              >
                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-10 flex sm:flex-col1">
            <button
              type="button"
              className="max-w-xs flex-1 bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-full"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? "Añadir al carrito" : "Agotado"}
            </button>
            
            {/* Botón de WhatsApp */}
            <a
              href={`https://wa.me/5493534284651?text=Quiero%20comprar%20este%20producto...%20${encodeURIComponent(`${window.location.origin}/products/${product.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 max-w-xs flex-1 bg-green-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:w-full"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                className="h-6 w-6 mr-2 fill-current"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <div className="mt-12">
        <Link
          href="/products"
          className="text-blue-600 hover:text-blue-500"
        >
          &larr; Volver a productos
        </Link>
      </div>
    </div>
  );
} 