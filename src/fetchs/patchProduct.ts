import axios from 'axios';
import { Product } from '@/interfaces/products';

export const patchProduct = async (id: string, data: Product): Promise<Product> => {
    console.log(data)
  try {
    const patchedProduct = await axios.patch(`http://localhost:8080/products/${id}`, data);
    console.log(patchedProduct);
    // return fetchSingleProduct.data;
    return patchedProduct.data;
  } catch (error) {
    throw new Error('Error fetching product. Contact your trust developer and fix it');
  }
};