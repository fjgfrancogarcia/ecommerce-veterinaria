"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

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

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener productos de la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products?limit=4");
        
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        
        const data = await response.json();
        setFeaturedProducts(data.slice(0, 4)); // Limitar a 4 productos
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("No se pudieron cargar los productos destacados.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Mock data for categories
  const categories = [
    { id: 1, name: "Alimentos", image: "/placeholder.png" },
    { id: 2, name: "Accesorios", image: "/placeholder.png" },
    { id: 3, name: "Medicamentos", image: "/placeholder.png" },
    { id: 4, name: "Juguetes", image: "/placeholder.png" },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-900 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">VillaVet</h1>
          <p className="mt-6 text-xl max-w-3xl">
            Todo lo que tu mascota necesita en un solo lugar. Productos de calidad al mejor precio.
          </p>
          <div className="mt-10">
            <Link
              href="/products"
              className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-gray-50"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Productos Destacados</h2>
          <Link href="/products" className="hidden text-sm font-semibold text-blue-600 hover:text-blue-500 sm:block">
            Ver todos los productos<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mt-8" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No hay productos destacados disponibles.</p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="relative">
                <div className="relative w-full h-72 rounded-lg overflow-hidden">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Sin imagen</span>
                    </div>
                  )}
                </div>
                <div className="relative mt-4">
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">${product.price.toFixed(2)}</p>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/products/${product.id}`}
                    className="relative flex bg-gray-100 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    Ver detalles<span className="sr-only">, {product.name}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-sm font-semibold text-blue-600 hover:text-blue-500 sm:hidden">
          <Link href="/products">
            Ver todos los productos<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Comprar por Categoría</h2>
            <Link href="/products" className="hidden text-sm font-semibold text-blue-600 hover:text-blue-500 sm:block">
              Ver todas las categorías<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {categories.map((category) => (
              <div key={category.id} className="group relative">
                <div className="relative w-full h-80 rounded-lg overflow-hidden bg-white group-hover:opacity-75 sm:h-64">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">{category.name}</span>
                  </div>
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  <Link href={`/products?category=${category.name}`}>
                    <span className="absolute inset-0" />
                    {category.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">Ver productos</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-sm font-semibold text-blue-600 hover:text-blue-500 sm:hidden">
            <Link href="/products">
              Ver todas las categorías<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Promotion Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-purple-900"/>
            </div>
            <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:py-24">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Envío Gratis en Pedidos mayores a $50
              </h2>
              <p className="mt-6 max-w-3xl text-xl text-blue-100">
                Compra hoy y disfruta de envío gratuito en todos los pedidos elegibles. ¡Oferta por tiempo limitado!
              </p>
              <div className="mt-10">
                <div className="inline-flex rounded-md shadow">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                  >
                    Comprar Ahora
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="py-10 px-6 bg-blue-700 rounded-3xl sm:py-16 sm:px-12 lg:flex lg:items-center">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">Suscríbete a nuestro boletín</h2>
              <p className="mt-4 max-w-3xl text-lg text-blue-100">
                Recibe las últimas actualizaciones sobre nuevos productos y próximas ofertas.
              </p>
            </div>
            <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white rounded-md"
                  placeholder="Ingresa tu correo"
                />
                <button
                  type="submit"
                  className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                >
                  Suscribirse
                </button>
              </form>
              <p className="mt-3 text-sm text-blue-100">
                Cuidamos tus datos. Lee nuestra{" "}
                <Link href="/privacy" className="text-white font-medium underline">
                  Política de Privacidad
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 