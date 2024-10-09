import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { getProductByID } from '@/fetchs/getProductById';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productId: string; //mandatory! <--- almost got insane here
};

export type ProductDetails = {
  title: string;
  price: number;
  category: string;
  image: string;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, productId }) => {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);

  useEffect(() => {
    if (isOpen) {
      
      const fetchProductDetails = async () => {
        try {
          const response = await getProductByID(productId);
          setProductDetails(response);
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };

      fetchProductDetails();
    }
  }, [isOpen, productId]);

  if (!isOpen || !productDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg w-96 h-2/4 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>
        <h2 className=" border-b-2 border-gray-300 text-xl font-semibold mb-6">{productDetails.title.length > 15 ? productDetails.title.substring(0, 75) + "..." : productDetails.title}</h2>
        
        
        <Image src={productDetails.image} alt={productDetails.title} width={300} height={300} className="w-2/3 h-52 object-cover mb-4" />
        <p className="text-gray-700">Price: ${productDetails.price}</p>
        <p className="mt-2 text-gray-700">Category: {productDetails.category}</p>
      </div>
    </div>
  );
};

export default Modal;
