import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const PaymentResult: React.FC = () => {
  const transaction = useSelector((state: RootState) => state.transaction);

  if (!transaction) {
    return <p>No hay transacción disponible.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Resultado del Pago</h1>
      <div className="max-w-lg mx-auto bg-neutral-light text-neutral-dark p-6 rounded-lg shadow-md text-center">
        {transaction.status === 'SUCCESS' && (
          <p className="text-lg">¡Pago exitoso! ID de la transacción: {transaction.transactionId}</p>
        )}
        {transaction.status === 'FAILED' && (
          <p className="text-lg">El pago ha fallado. Por favor, inténtelo de nuevo.</p>
        )}
        {transaction.status === 'PENDING' && (
          <p className="text-lg">El pago está pendiente. Espere un momento.</p>
        )}
        <button
          className="mt-4 bg-primary text-primary-text py-2 px-4 rounded-lg hover:bg-primary-hover focus:ring focus:ring-primary"
        >
          Volver a Inicio
        </button>
      </div>
    </div>
  );
};

export default PaymentResult;