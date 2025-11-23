import { useMemo } from 'react';
import { useStore } from '../store';
import { TaskItem } from './TaskItem';
import { SearchBar } from './SearchBar';
import { FaInbox, FaSearch } from 'react-icons/fa';

export const TaskList = () => {
  const { tasks, loading, searchQuery } = useStore();

  // Filter tasks based on search query
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;

    const query = searchQuery.toLowerCase();
    return tasks.filter(task =>
      task.title.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query)
    );
  }, [tasks, searchQuery]);

  const activeTasks = filteredTasks.filter(t => !t.completed);
  const completedTasks = filteredTasks.filter(t => t.completed);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div>
      {tasks.length > 0 && <SearchBar />}

      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <FaInbox className="mx-auto text-gray-400 dark:text-gray-500" size={48} />
          <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">No tasks yet</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">Create your first task to get started!</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <FaSearch className="mx-auto text-gray-400 dark:text-gray-500" size={48} />
          <h3 className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">No results found</h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            No tasks match "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {activeTasks.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
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
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
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
      )}
    </div>
  );
};
