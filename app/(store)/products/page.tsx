"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Categorías para filtrar
  const categories = [
    { id: "all", name: "Todas las Categorías" },
    { id: "alimentos", name: "Alimentos" },
    { id: "accesorios", name: "Accesorios" },
    { id: "medicamentos", name: "Medicamentos" },
    { id: "juguetes", name: "Juguetes" },
    { id: "higiene", name: "Higiene" },
  ];

  const priceRanges = [
    { id: "all", name: "Todos los Precios" },
    { id: "under-25", name: "Menos de $25" },
    { id: "25-50", name: "$25 a $50" },
    { id: "50-100", name: "$50 a $100" },
    { id: "100-200", name: "$100 a $200" },
    { id: "over-200", name: "Más de $200" },
  ];

  // Obtener productos de la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("No se pudieron cargar los productos. Intente nuevamente.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Todos los Productos</h1>

      {/* Estado de carga o error */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mt-8" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filtros */}
          <div className="hidden lg:block">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Filtros</h2>

            {/* Categoría */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Categoría</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      id={`category-${category.id}`}
                      name="category"
                      type="radio"
                      defaultChecked={category.id === "all"}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-600">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Precio */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Precio</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center">
                    <input
                      id={`price-${range.id}`}
                      name="price"
                      type="radio"
                      defaultChecked={range.id === "all"}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={`price-${range.id}`} className="ml-3 text-sm text-gray-600">
                      {range.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cuadrícula de Productos */}
          <div className="lg:col-span-3">
            {/* Opciones de ordenamiento y vista */}
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <p className="text-sm text-gray-500 mr-3">Ordenar por:</p>
                <select
                  id="sort-by"
                  name="sort-by"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Destacados</option>
                  <option value="newest">Más recientes</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                </select>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className={`p-2 rounded-md ${
                    viewMode === "grid" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`ml-2 p-2 rounded-md ${
                    viewMode === "list" ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mostrar mensajes si no hay productos */}
            {products.length === 0 && !loading && !error ? (
              <div className="py-12 text-center">
                <p className="text-gray-500">No hay productos disponibles.</p>
              </div>
            ) : (
              // Vista en cuadrícula
              viewMode === "grid" ? (
                <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
                    <div key={product.id} className="group relative">
                      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400">Sin imagen</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex justify-between">
                        <div>
                          <h3 className="text-sm text-gray-700">
                            <Link href={`/products/${product.id}`}>
                              <span aria-hidden="true" className="absolute inset-0" />
                              {product.name}
                            </Link>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Vista en lista
                <div className="mt-8 space-y-6">
                  {products.map((product) => (
                    <div key={product.id} className="flex flex-col sm:flex-row border-b border-gray-200 pb-6">
                      <div className="sm:w-48 sm:h-48 bg-gray-200 rounded-md overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-center object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400">Sin imagen</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link href={`/products/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                        <p className="mt-2 text-lg font-medium text-gray-900">${product.price.toFixed(2)}</p>
                        <div className="mt-3">
                          <p className="text-sm text-gray-500">
                            {product.description ? (
                              product.description.length > 150 
                                ? `${product.description.substring(0, 150)}...` 
                                : product.description
                            ) : "Sin descripción"}
                          </p>
                        </div>
                        <div className="mt-4">
                          <Link
                            href={`/products/${product.id}`}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Ver detalles
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
} 