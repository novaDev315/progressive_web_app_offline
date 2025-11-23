import type { Task, Priority } from '../db';
import { useStore } from '../store';
import { FaCheck, FaTrash, FaCloud, FaCloudUploadAlt, FaShare, FaFlag } from 'react-icons/fa';

interface TaskItemProps {
  task: Task;
}

const priorityConfig: Record<Priority, { color: string; label: string }> = {
  high: { color: 'text-red-500 dark:text-red-400', label: 'High' },
  medium: { color: 'text-yellow-500 dark:text-yellow-400', label: 'Medium' },
  low: { color: 'text-green-500 dark:text-green-400', label: 'Low' },
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTask, deleteTask } = useStore();

  const handleToggle = () => {
    if (task.id) {
      toggleTask(task.id);
    }
  };

  const handleDelete = () => {
    if (task.id) {
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

  const priority = task.priority || 'medium';
  const priorityStyle = priorityConfig[priority];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all hover:shadow-lg ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start gap-4">
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            task.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-400'
          }`}
        >
          {task.completed && <FaCheck className="text-white" size={12} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className={`font-semibold text-gray-800 dark:text-white ${
              task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
            }`}>
              {task.title}
            </h3>
            <span className={`flex items-center gap-1 text-xs ${priorityStyle.color}`} title={`${priorityStyle.label} priority`}>
              <FaFlag size={10} />
              <span className="hidden sm:inline">{priorityStyle.label}</span>
            </span>
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>
          )}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            {task.synced ? (
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <FaCloud size={12} />
                Synced
              </span>
            ) : (
              <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                <FaCloudUploadAlt size={12} />
                Pending sync
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="flex-shrink-0 p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            title="Share task"
          >
            <FaShare size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Delete task"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
