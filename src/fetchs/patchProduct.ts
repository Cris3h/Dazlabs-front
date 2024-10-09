import axios from 'axios';
import { Product } from '@/interfaces/products';

export const patchProduct = async (id: string, data: Product): Promise<Product> => {
  try {
    const patchedProduct = await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}`, data);
    return patchedProduct.data;
  } catch (error) {
    throw new Error('Error fetching product. Contact your trust developer and fix it');
  }
};