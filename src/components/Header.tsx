import { useStore, useThemeStore } from '../store';
import { FaWifi, FaSync, FaMoon, FaSun } from 'react-icons/fa';
import { MdSignalWifiOff } from 'react-icons/md';
import { DataManager } from './DataManager';

export const Header = () => {
  const { isOnline, syncData } = useStore();
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">PWA Task Manager</h1>
            <p className="text-sm text-purple-100">Offline-First Architecture Demo</p>
          </div>
          <div className="flex items-center gap-3">
            <DataManager />

            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-white/30">
              {isOnline ? (
                <FaWifi className="text-green-300" size={20} />
              ) : (
                <MdSignalWifiOff className="text-yellow-300" size={20} />
              )}
              <span className="text-sm hidden sm:inline">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            {isOnline && (
              <button
                onClick={syncData}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Sync data"
              >
                <FaSync size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
