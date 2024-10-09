import { useState } from 'react';
import Image from 'next/image';
import Modal from './modal';
import { Product } from '@/interfaces/products';
import ModalPatchProducts from './modalPatchProduct';
import editIcon from '@/icons/edit.png'
import deleteIcon from '@/icons/delete.png'
import ModalDeleteProduct from './modalDeleteProduct';

const Cards= ( product: Product ) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patchModalOpen, setPatchModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  //id
 const openModal = () => {
  closeDeleteModal();
  closePatchModal();
  setIsModalOpen(true);
};
const closeModal = () => setIsModalOpen(false);


const openPatchModal = (e: React.MouseEvent) => {
  e.stopPropagation(); //check this out!. I'm amazing, (thanks StackOverflow)
  closeModal();
  closeDeleteModal();
  setPatchModalOpen(true);
};
const closePatchModal = () => setPatchModalOpen(false);


const openDeleteModal = (e: React.MouseEvent) => {
  e.stopPropagation();
  closeModal();
  closePatchModal();
  setDeleteModalOpen(true);
};
const closeDeleteModal = () => setDeleteModalOpen(false);

return (
  <>
    <div 
      className="flex flex-col bg-white border border-gray-300 rounded-lg justify-between items-center p-4 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer relative"
      onClick={openModal} // event-listener
    >
      <div className="flex flex-col flex-grow">
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
        <img src={product.image} alt={product.title} className="justify-self-center items-center w-50 h-40 object-cover mb-2" />
        <p className="text-gray-700">Price: ${product.price}</p>
      </div>

      <div className="flex justify-between w-full mt-4">
        <button 
          onClick={openPatchModal} 
          className="flex justify-center items-center w-1/2 border-t border-gray-300 py-2"
        >
          <Image src={editIcon} alt="Edit product" width={24} height={24} />
          <span className="ml-2">Edit</span>
        </button>
        <button 
          onClick={openDeleteModal} 
          className="flex justify-center items-center w-1/2 border-t border-gray-300 py-2"
        >
          <Image src={deleteIcon} alt="Delete product" width={24} height={24} />
          <span className="ml-2">Delete</span>
        </button>
      </div>
    </div>

    <Modal isOpen={isModalOpen} onClose={closeModal} productId={product._id} />
    <ModalPatchProducts isOpen={patchModalOpen} onClose={closePatchModal} productId={product._id} />
    <ModalDeleteProduct isOpen={deleteModalOpen} onClose={closeDeleteModal} productId={product._id} />
  </>
);

};

export default Cards;
