import { ModalProps } from "./modal";
import axios from "axios";

const ModalDeleteProduct: React.FC<ModalProps> = ({ isOpen, onClose, productId }) => {


  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productId}`);
      alert('Product deleted successfully!');
      onClose();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };



  if (!isOpen) return null;




  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-6">Are you sure you want to delete this product?</h2>
        
        <div className="flex justify-around w-full mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            onClick={handleDelete}
          >
            Delete
          </button>
          
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDeleteProduct;
