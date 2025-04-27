import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
  return (
    <div
      className={`fixed top-24 right-4 p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
        type === 'success' ? 'bg-white border border-green-500' : 'bg-white border border-red-500'
      }`}
    >
      {type === 'success' ? (
        <CheckCircleIcon className="h-6 w-6 text-green-500" />
      ) : (
        <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
      )}
      <span className="text-gray-800">{message}</span>
    </div>
  );
};

export default Notification;