import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db, type Task } from './db';

interface AppState {
  tasks: Task[];
  isOnline: boolean;
  loading: boolean;
  error: string | null;
  darkMode: boolean;
  searchQuery: string;
  deletedTask: Task | null;
  showUndoToast: boolean;

  // Actions
  loadTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'synced'>) => Promise<void>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  setOnlineStatus: (status: boolean) => void;
  syncData: () => Promise<void>;
  toggleDarkMode: () => void;
  setSearchQuery: (query: string) => void;
  undoDelete: () => Promise<void>;
  clearUndoToast: () => void;
  exportData: () => Promise<string>;
  importData: (jsonData: string) => Promise<void>;
}

// Separate store for theme persistence
export const useThemeStore = create<{ darkMode: boolean; toggleDarkMode: () => void }>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    { name: 'theme-storage' }
  )
);

export const useStore = create<AppState>((set, get) => ({
  tasks: [],
  isOnline: navigator.onLine,
  loading: false,
  error: null,
  darkMode: false,
  searchQuery: '',
  deletedTask: null,
  showUndoToast: false,

  loadTasks: async () => {
    try {
      set({ loading: true, error: null });
      const tasks = await db.tasks.orderBy('createdAt').reverse().toArray();
      set({ tasks, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addTask: async (taskData) => {
    try {
      const now = new Date();
      const task: Task = {
        ...taskData,
        createdAt: now,
        updatedAt: now,
        synced: false,
      };

      const id = await db.tasks.add(task);

      // Add to sync queue
      await db.syncQueue.add({
        action: 'create',
        taskId: id,
        payload: task,
        timestamp: now,
        retryCount: 0,
      });

      await get().loadTasks();

      // Try to sync if online
      if (get().isOnline) {
        get().syncData();
      }
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateTask: async (id, updates) => {
    try {
      const now = new Date();
      await db.tasks.update(id, {
        ...updates,
        updatedAt: now,
        synced: false,
      });

      // Add to sync queue
      await db.syncQueue.add({
        action: 'update',
        taskId: id,
        payload: { ...updates, updatedAt: now },
        timestamp: now,
        retryCount: 0,
      });

      await get().loadTasks();

      // Try to sync if online
      if (get().isOnline) {
        get().syncData();
      }
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  deleteTask: async (id) => {
    try {
      // Save task for undo
      const taskToDelete = await db.tasks.get(id);

      await db.tasks.delete(id);

      // Add to sync queue
      await db.syncQueue.add({
        action: 'delete',
        taskId: id,
        payload: {},
        timestamp: new Date(),
        retryCount: 0,
      });

      // Store deleted task for undo and show toast
      if (taskToDelete) {
        set({ deletedTask: taskToDelete, showUndoToast: true });
        // Auto-clear after 5 seconds
        setTimeout(() => {
          set({ showUndoToast: false, deletedTask: null });
        }, 5000);
      }

      await get().loadTasks();

      // Try to sync if online
      if (get().isOnline) {
        get().syncData();
      }
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  toggleTask: async (id) => {
    try {
      const task = await db.tasks.get(id);
      if (task) {
        await get().updateTask(id, { completed: !task.completed });
      }
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  setOnlineStatus: (status) => {
    set({ isOnline: status });
    if (status) {
      get().syncData();
    }
  },

  syncData: async () => {
    const { isOnline } = get();
    if (!isOnline) return;

    try {
      const queueItems = await db.syncQueue.toArray();

      for (const item of queueItems) {
        // In a real app, you would make API calls here
        // For demo purposes, we'll just mark tasks as synced
        if (item.taskId) {
          await db.tasks.update(item.taskId, { synced: true });
        }
        await db.syncQueue.delete(item.id!);
      }

      await get().loadTasks();
    } catch (error) {
      console.error('Sync error:', error);
    }
  },

  toggleDarkMode: () => {
    set((state) => ({ darkMode: !state.darkMode }));
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  undoDelete: async () => {
    const { deletedTask } = get();
    if (!deletedTask) return;

    try {
      // Re-add the deleted task
      await db.tasks.add(deletedTask);
      set({ deletedTask: null, showUndoToast: false });
      await get().loadTasks();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  clearUndoToast: () => {
    set({ showUndoToast: false, deletedTask: null });
  },

  exportData: async () => {
    try {
      const tasks = await db.tasks.toArray();
      const exportData = {
        version: '1.0',
        exportedAt: new Date().toISOString(),
        tasks: tasks.map(({ id, ...task }) => task),
      };
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      set({ error: (error as Error).message });
      return '';
    }
  },

  importData: async (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      if (!data.tasks || !Array.isArray(data.tasks)) {
        throw new Error('Invalid import file format');
      }

      // Add imported tasks
      for (const task of data.tasks) {
        await db.tasks.add({
          ...task,
          priority: task.priority || 'medium',
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          synced: false,
        });
      }

      await get().loadTasks();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
