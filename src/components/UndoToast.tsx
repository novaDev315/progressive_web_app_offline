import { useStore } from '../store';
import { FaUndo, FaTimes } from 'react-icons/fa';

export const UndoToast = () => {
  const { showUndoToast, undoDelete, clearUndoToast } = useStore();

  if (!showUndoToast) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gray-900 dark:bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg animate-slide-up z-50">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm">Task deleted</span>
        <div className="flex items-center gap-2">
          <button
            onClick={undoDelete}
            className="flex items-center gap-1 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm font-medium transition-colors"
          >
            <FaUndo size={12} />
            Undo
          </button>
          <button
            onClick={clearUndoToast}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            title="Dismiss"
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
