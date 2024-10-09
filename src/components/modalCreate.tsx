import { useState } from "react";
import { postProduct } from "@/fetchs/postProduct";

interface CreateModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
  const ModalCreateProduct: React.FC<CreateModalProps> = ({
    isOpen,
    onClose,
  }) => {
    const [formData, setFormData] = useState({
      title: "",
      category: "",
      price: 0,
      image: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await postProduct(formData); 
        alert("Product created successfully!");
        onClose(); 
      } catch (error) {
        console.error("Error creating product:", error);
      }
    };
  
    if (!isOpen) return null; 
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            X
          </button>
          <h2 className="border-b-2 border-gray-300 text-xl font-semibold mb-6">
            Create New Product
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
                required
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
                required
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
                required
                min="0" 
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
                required
              />
            </label>
  
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              Create Product
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ModalCreateProduct;