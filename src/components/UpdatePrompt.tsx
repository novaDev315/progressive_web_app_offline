import { useState, useEffect } from 'react';
import { FaSync, FaTimes } from 'react-icons/fa';

interface UpdatePromptProps {
  onUpdate: () => void;
}

export const UpdatePrompt = ({ onUpdate }: UpdatePromptProps) => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // This component is controlled by the parent
    // Show prompt when needed
    setShowPrompt(true);
  }, []);

  const handleUpdate = () => {
    setShowPrompt(false);
    onUpdate();
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-2xl p-4 text-white">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg">
            <FaSync className="text-white animate-spin" size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Update Available</h3>
            <p className="text-sm text-blue-100 mt-1">
              A new version of the app is available. Reload to get the latest features and improvements.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-white text-purple-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Reload Now
              </button>
              <button
                onClick={handleDismiss}
                className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
              >
                Later
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 text-white/80 hover:text-white"
          >
            <FaTimes size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
