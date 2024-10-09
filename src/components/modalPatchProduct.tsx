import { ModalProps, ProductDetails } from './modal';
import { useState, useEffect } from 'react';
import { patchProduct } from '@/fetchs/patchProduct';
import { getProductByID } from '@/fetchs/getProductById';

const ModalPatchProducts: React.FC<ModalProps> = ({ isOpen, onClose, productId }) => {
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
  
  const [formData, setFormData] = useState({
    _id: productId,
    title: '',
    price: 0,
    category: '',
    image: ''
  });

  // charges before opening the modal
  useEffect(() => {
    if (isOpen && productId) {

      const fetchProductDetails = async () => {
        try {
        const response = await getProductByID(productId);
          setProductDetails(response);
          setFormData({
            _id: response._id,
            title: response.title,
            price: response.price,
            category: response.category,
            image: response.image
          });

        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      };
      fetchProductDetails();
    }
  }, [isOpen, productId]);

  // handle changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // send changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await patchProduct(productId, formData);
      alert('Product updated successfully!');
      onClose(); // patch and then close the modal :D 
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

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
        <h2 className="border-b-2 border-gray-300 text-xl font-semibold mb-6">
          Edit Product: {formData.title.length > 15 ? formData.title.substring(0, 75) + "..." : formData.title}
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <label className="w-full mb-2">
            Title:
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>

          <label className="w-full mb-2">
            Price:
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>

          <label className="w-full mb-2">
            Category:
            <input 
              type="text" 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>

          <label className="w-full mb-2">
            Image URL:
            <input 
              type="text" 
              name="image" 
              value={formData.image} 
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mt-1"
            />
          </label>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalPatchProducts;
