import React, { useState } from 'react';
import Notification from '../components/Notification';
import { validateCardNumber, validateExpirationDate, validateCVV, validateAddress } from '../utils/validation';

interface CartItem {
  price: number;
  quantity: number;
}

const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    address: '',
    cardType: '',
  });

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const cardNumberId = 'card-number';
  const expirationDateId = 'expiration-date';
  const cvvId = 'cvv';
  const addressId = 'address';
  const submitButtonId = 'submit-button';

  const detectCardType = (number: string) => {
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const masterCardRegex = /^5[1-5][0-9]{14}$/;

    if (visaRegex.test(number)) return 'VISA';
    if (masterCardRegex.test(number)) return 'MasterCard';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };
      if (name === 'cardNumber') {
        updatedForm.cardType = detectCardType(value);
      }
      return updatedForm;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCardNumber(formData.cardNumber)) {
      setNotification({ message: 'Número de tarjeta inválido.', type: 'error' });
      return;
    }

    if (!validateExpirationDate(formData.expirationDate)) {
      setNotification({ message: 'Fecha de expiración inválida. Use el formato MM/AA.', type: 'error' });
      return;
    }

    if (!validateCVV(formData.cvv)) {
      setNotification({ message: 'CVV inválido.', type: 'error' });
      return;
    }

    if (!validateAddress(formData.address)) {
      setNotification({ message: 'La dirección de entrega es demasiado corta.', type: 'error' });
      return;
    }

    try {
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]'); // Obtener productos del carrito
      const totalAmount = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0); // Calcular monto total

      // Crear transacción en el backend
      const transactionResponse = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
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
          Authorization: 'Bearer pub_stagint_fjIqRyHmHvmqYgPFCO5nibfrtraL6ixq',
        },
        body: JSON.stringify({
          amount_in_cents: Math.round(totalAmount * 100),
          currency: 'COP',
          customer_email: 'procesoseleccionbackend@yopmail.com',
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

      if (wompiData.data.status === 'APPROVED') {
        setNotification({ message: 'Pago exitoso. Transacción completada.', type: 'success' });
        setTimeout(() => {
          setNotification(null);
          window.location.href = '/';
        }, 3000);
      } else {
        setNotification({ message: 'El pago ha fallado. Por favor, inténtelo de nuevo.', type: 'error' });
      }
    } catch (error) {
      console.error('Error procesando el pago:', error);
      setNotification({ message: 'Hubo un error procesando el pago. Por favor, inténtelo de nuevo.', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Formulario de Pago</h1>
          <div className="mb-4">
            <label htmlFor={cardNumberId} className="block text-gray-700 font-medium mb-2">Número de Tarjeta</label>
            <input
              id={cardNumberId}
              type="text"
              name="cardNumber"
              placeholder="Número de Tarjeta"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formData.cardType && (
              <p className="text-sm text-gray-500 mt-1">Tipo de tarjeta detectado: {formData.cardType}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor={expirationDateId} className="block text-gray-700 font-medium mb-2">Fecha de Expiración</label>
            <input
              id={expirationDateId}
              type="text"
              name="expirationDate"
              placeholder="MM/AA"
              value={formData.expirationDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor={cvvId} className="block text-gray-700 font-medium mb-2">CVV</label>
            <input
              id={cvvId}
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor={addressId} className="block text-gray-700 font-medium mb-2">Dirección de Entrega</label>
            <input
              id={addressId}
              type="text"
              name="address"
              placeholder="Dirección de Entrega"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            id={submitButtonId}
            type="submit"
            className="w-full bg-primary text-primary-text py-2 px-4 rounded-lg hover:bg-primary-hover focus:ring focus:ring-primary"
          >
            Pagar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;