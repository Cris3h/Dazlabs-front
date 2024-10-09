import axios from "axios";
import { NewProduct } from "@/interfaces/products";

export const postProduct = async (productData: NewProduct) => {
    const { title, category, price, image } = productData;
    const data = { title, category, price, image: `http://${image}` };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error: any) {
      throw new Error('Error creating product: ' + (error.response?.data?.message || error.message));
    }
  };