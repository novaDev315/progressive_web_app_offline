import { useEffect, useState } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { useStore } from '../store';

export const ErrorToast = () => {
  const { error } = useStore();
  const [show, setShow] = useState(false);

  const isSuccess = error?.includes('Import complete') || error?.includes('Successfully imported');

  useEffect(() => {
    if (error) {
      setShow(true);
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [error]);

  if (!show || !error) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in max-w-md">
      <div className={`${isSuccess ? 'bg-green-600' : 'bg-red-600'} text-white rounded-lg shadow-2xl p-4`}>
        <div className="flex items-start gap-3">
          {isSuccess ? (
            <FaCheckCircle className="flex-shrink-0 mt-0.5" size={20} />
          ) : (
            <FaExclamationCircle className="flex-shrink-0 mt-0.5" size={20} />
          )}
          <div className="flex-1">
            <h4 className="font-semibold">{isSuccess ? 'Success' : 'Error'}</h4>
            <p className={`text-sm ${isSuccess ? 'text-green-100' : 'text-red-100'} mt-1`}>{error}</p>
          </div>
          <button
            onClick={() => setShow(false)}
            className="flex-shrink-0 p-1 text-white/80 hover:text-white"
          >
            <FaTimes size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
