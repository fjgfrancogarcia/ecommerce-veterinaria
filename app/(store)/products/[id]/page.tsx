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