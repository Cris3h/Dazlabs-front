export interface Product {
    _id: string;
    title: string;
    price: number;
    category: string;
    image: string;
  }

export interface ProductsResponse {
    products: Product[];
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    hasPrev: boolean;
    hasNext: boolean;
  }

export interface NewProduct {
    title: string;
    category: string;
    price: number;
    image: string;
  }