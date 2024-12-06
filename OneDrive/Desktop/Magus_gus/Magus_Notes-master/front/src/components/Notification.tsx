import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const Icon = type === 'success' ? CheckCircle : XCircle;

  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white p-4 rounded-md shadow-lg flex items-center max-w-sm`}>
      <Icon className="w-6 h-6 mr-2" />
      <span className="flex-grow">{message}</span>
      <button onClick={onClose} className="ml-2 focus:outline-none">
        <XCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Notification;