import axios from 'axios';
import { ProductsResponse } from '@/interfaces/products';

export const fetchProducts = async (page: number): Promise<ProductsResponse> => {
  const limit: number = 10
  let object; 
  object = await axios.get<ProductsResponse>(`http://localhost:8080/products?page=${page}&limit=${limit}`);
  console.log(object.data)
  if(object.data.products.length === 0){
    object = await axios.get<ProductsResponse>(`http://localhost:8080/products?type='celular'&page=${page}&limit=${limit}`);
    object = await axios.get<ProductsResponse>(`http://localhost:8080/products?type='tablet'&page=${page}&limit=${limit}`);
    object = await axios.get<ProductsResponse>(`http://localhost:8080/products?type='laptop'&page=${page}&limit=${limit}`);
  }
  return object.data;
};


