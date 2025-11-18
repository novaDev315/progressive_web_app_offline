import { useEffect } from 'react';
import { useStore } from './store';
import { useServiceWorker } from './hooks/useServiceWorker';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { InstallPrompt } from './components/InstallPrompt';
import { NotificationPrompt } from './components/NotificationPrompt';
import { UpdatePrompt } from './components/UpdatePrompt';
import { ErrorToast } from './components/ErrorToast';

function App() {
  const { loadTasks, setOnlineStatus } = useStore();
  const { needRefresh, handleUpdate } = useServiceWorker();

  useEffect(() => {
    // Load tasks on mount
    loadTasks();

    // Set up online/offline detection
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [loadTasks, setOnlineStatus]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <NotificationPrompt />
        <TaskForm />
        <TaskList />
      </main>

      <InstallPrompt />
      {needRefresh && <UpdatePrompt onUpdate={handleUpdate} />}
      <ErrorToast />

      {/* PWA Features Info */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            PWA Features Demonstrated
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Offline-first architecture with IndexedDB</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Service worker caching</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Background sync queue</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Push notifications support</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Installable as app</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Responsive design</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Stale-while-revalidate caching</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">✓</span>
              <span>Web Share API integration</span>
            </li>
          </ul>
        </div>
      </div>

      <footer className="text-center py-8 text-gray-600 text-sm">
        <p>
          Built with React, TypeScript, Vite, and Workbox
        </p>
        <p className="mt-1">
          Demonstrating modern PWA capabilities
        </p>
      </footer>
    </div>
  );
}

export default App;
