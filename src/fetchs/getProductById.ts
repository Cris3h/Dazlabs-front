import axios from 'axios';
import { Product } from '@/interfaces/products';

export const getProductByID = async (id: string): Promise<Product> => {
    
    try {
        const fetchSingleProduct = await axios.get(`http://localhost:8080/products/${id}`);
        return fetchSingleProduct.data;
    } catch (error) {   
        throw new Error('Error fetching product. Contact your trust developer and fix it') ;
    }
};