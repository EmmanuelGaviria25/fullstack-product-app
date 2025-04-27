import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeItem, clearCart } from '../store/slices/cartSlice';
import PaymentForm from './PaymentForm';
import { TrashIcon } from '@heroicons/react/24/outline';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const baseFee = 5.0; // Tarifa base adicional
  const shippingCost = 10.0; // Costo de envío
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + baseFee + shippingCost;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <ul className="mb-4">
              {cartItems.map((item) => (
                <li key={item.id} className="mb-2 flex justify-between items-center">
                  <span>
                    {item.name} - ${item.price} x {item.quantity}
                  </span>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 bg-transparent hover:bg-gray-100 flex items-center space-x-1"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={handleClearCart}
              className="mt-4 mb-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:ring focus:ring-red-300 flex items-center justify-center space-x-2"
            >
              <TrashIcon className="h-5 w-5" />
              <span>Limpiar Carrito</span>
            </button>
            <h2 className="text-md">Tarifa base adicional: ${baseFee}</h2>
            <h2 className="text-md mb-4">Costo de envío: ${shippingCost}</h2>
            <h2 className="text-xl font-bold mb-4">Total: ${totalAmount.toFixed(2)}</h2>
            <button
              onClick={openModal}
              className="mt-4 w-full bg-primary text-primary-text py-2 px-4 rounded-lg hover:bg-primary-hover focus:ring focus:ring-primary"
            >
              Pagar con tarjeta de crédito
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            className="p-6 rounded-lg shadow-lg w-full max-w-lg relative transform transition-transform scale-95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-8 right-8 text-gray-500 hover:text-gray-800 bg-transparent hover:bg-transparent text-2xl font-bold"
            >
              &times;
            </button>
            <PaymentForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;