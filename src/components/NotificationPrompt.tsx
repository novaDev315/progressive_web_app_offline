import { useState } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa';

export const NotificationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(
    'Notification' in window && Notification.permission === 'default'
  );

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
      new Notification('PWA Task Manager', {
        body: 'You will now receive notifications!',
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
      });
    }

    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <div className="flex items-start gap-3">
        <FaBell className="text-blue-500 flex-shrink-0 mt-1" size={20} />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">Enable Notifications</h3>
          <p className="text-sm text-gray-600 mt-1">
            Get notified about task updates and reminders.
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={requestPermission}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Enable
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowPrompt(false)}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
        >
          <FaTimes size={16} />
        </button>
      </div>
    </div>
  );
};
