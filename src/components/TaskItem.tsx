import type { Task } from '../db';
import { useStore } from '../store';
import { FaCheck, FaTrash, FaCloud, FaCloudUploadAlt, FaShare } from 'react-icons/fa';

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTask, deleteTask } = useStore();

  const handleToggle = () => {
    if (task.id) {
      toggleTask(task.id);
    }
  };

  const handleDelete = () => {
    if (task.id && confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleShare = async () => {
    if (!navigator.share) {
      // Fallback: copy to clipboard
      const text = `${task.title}\n${task.description || ''}`;
      try {
        await navigator.clipboard.writeText(text);
        alert('Task copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy:', err);
      }
      return;
    }

    try {
      await navigator.share({
        title: task.title,
        text: task.description || task.title,
        url: window.location.href,
      });
    } catch (err) {
      // User cancelled or share failed
      if ((err as Error).name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-purple-500'
          }`}
        >
          {task.completed && <FaCheck className="text-white" size={12} />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-gray-800 ${
            task.completed ? 'line-through text-gray-500' : ''
          }`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            {task.synced ? (
              <span className="flex items-center gap-1 text-green-600">
                <FaCloud size={12} />
                Synced
              </span>
            ) : (
              <span className="flex items-center gap-1 text-orange-600">
                <FaCloudUploadAlt size={12} />
                Pending sync
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="flex-shrink-0 p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            title="Share task"
          >
            <FaShare size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
