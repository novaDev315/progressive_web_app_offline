import { useRef } from 'react';
import { useStore } from '../store';
import { FaDownload, FaUpload } from 'react-icons/fa';

export const DataManager = () => {
  const { exportData, importData } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    const data = await exportData();
    if (!data) return;

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      await importData(content);
    };
    reader.readAsText(file);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:shadow-md transition-shadow text-sm"
        title="Export tasks"
      >
        <FaDownload size={14} />
        <span className="hidden sm:inline">Export</span>
      </button>

      <label className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer text-sm">
        <FaUpload size={14} />
        <span className="hidden sm:inline">Import</span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
    </div>
  );
};
