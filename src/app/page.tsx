"use client";
import React, { useEffect, useState } from "react";
import { fetchProducts } from "@/fetchs/getAllProducts";
import { ProductsResponse, Product } from "@/interfaces/products";
import Cards from "@/components/productCard";
import addIcon from "@/icons/add.png";
import Image from "next/image";
import { AnimatedTitle } from "@/components/h1Motion";
import ModalCreateProduct from "@/components/modalCreate";

const Page = () => {
  const [products, setProducts] = useState<ProductsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const productsData = await fetchProducts(currentPage);
        setProducts(productsData);
      } catch (err) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-center items-center mb-12">
        <AnimatedTitle />
      </div>

      {/* add */}
      <div className="flex justify-end items-center">
        <Image
          src={addIcon}
          alt="Add product"
          width={50}
          height={50}
          className="border-2 border-gray-300 rounded-md hover:cursor-pointer w-10"
          onClick={openModal} 
        />
      </div>

      <div className="flex justify-end items-center mb-12 text-xs">
        <p>vende tus productos</p>
      </div>

      {/* cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products?.products.map((product: Product) => (
          <li key={product._id} className="flex justify-center">
            <Cards
              _id={product._id}
              title={product.title}
              price={product.price}
              image={product.image}
              category={product.category}
            />
          </li>
        ))}
      </ul>
        {/* pagination */}
      <div className="flex flex-col justify-center items-center mt-8">
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={!products?.hasPrev}
            className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ${
              !products?.hasPrev ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, products ? products.totalPages : 1))
            }
            disabled={!products?.hasNext}
            className={`ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ${
              !products?.hasNext ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>

        <p>
          Page {products?.currentPage} of {products?.totalPages}
        </p>
      </div>
      {/* modal bonitinho */}
      <ModalCreateProduct isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Page;

