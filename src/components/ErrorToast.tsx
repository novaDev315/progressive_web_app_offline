import { useEffect, useState } from 'react';
import { FaExclamationCircle, FaTimes } from 'react-icons/fa';
import { useStore } from '../store';

export const ErrorToast = () => {
  const { error } = useStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error) {
      setShow(true);
      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!show || !error) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in max-w-md">
      <div className="bg-red-600 text-white rounded-lg shadow-2xl p-4">
        <div className="flex items-start gap-3">
          <FaExclamationCircle className="flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <h4 className="font-semibold">Error</h4>
            <p className="text-sm text-red-100 mt-1">{error}</p>
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
