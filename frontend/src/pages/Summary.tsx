import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Summary: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const baseFee = 5.0; // Tarifa base adicional
  const shippingCost = 10.0; // Costo de envío
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + baseFee + shippingCost;

  const handlePayment = async () => {
    try {
      // Crear transacción en el backend
      const transactionResponse = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          status: 'PENDING',
          items: cartItems,
        }),
      });

      const transactionData = await transactionResponse.json();

      // Llamar a la API de Wompi para procesar el pago
      const wompiResponse = await fetch('https://api-sandbox.co.uat.wompi.dev/v1/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7',
        },
        body: JSON.stringify({
          amount_in_cents: Math.round(total * 100),
          currency: 'COP',
          customer_email: 'cliente@ejemplo.com',
          payment_method: {
            type: 'CARD',
            token: 'tok_test_visa', // Token de prueba
          },
          reference: transactionData.id,
        }),
      });

      const wompiData = await wompiResponse.json();

      // Actualizar transacción en el backend
      await fetch(`/api/transactions/${transactionData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: wompiData.data.status,
        }),
      });

      alert(`Pago ${wompiData.data.status === 'APPROVED' ? 'exitoso' : 'fallido'}`);
    } catch (error) {
      console.error('Error procesando el pago:', error);
      alert('Hubo un error procesando el pago. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
          <h1 className="text-2xl font-bold mb-4 text-center">Resumen de Pago</h1>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="mb-2">
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>
          <p className="mb-2">Tarifa base adicional: ${baseFee}</p>
          <p className="mb-4">Costo de envío: ${shippingCost}</p>
          <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
          <button
            onClick={handlePayment}
            className="mt-4 w-full bg-primary text-primary-text py-2 px-4 rounded-lg hover:bg-primary-hover focus:ring focus:ring-primary"
          >
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;