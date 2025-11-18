import { useStore } from '../store';
import { TaskItem } from './TaskItem';
import { FaInbox } from 'react-icons/fa';

export const TaskList = () => {
  const { tasks, loading } = useStore();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <FaInbox className="mx-auto text-gray-400" size={48} />
        <h3 className="mt-4 text-xl font-semibold text-gray-700">No tasks yet</h3>
        <p className="mt-2 text-gray-500">Create your first task to get started!</p>
      </div>
    );
  }

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="space-y-6">
      {activeTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Active Tasks ({activeTasks.length})
          </h2>
          <div className="space-y-3">
            {activeTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Completed Tasks ({completedTasks.length})
          </h2>
          <div className="space-y-3">
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
