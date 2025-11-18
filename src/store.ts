import { create } from 'zustand';
import { db, type Task } from './db';

interface AppState {
  tasks: Task[];
  isOnline: boolean;
  loading: boolean;
  error: string | null;

  // Actions
  loadTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'synced'>) => Promise<void>;
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  setOnlineStatus: (status: boolean) => void;
  syncData: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  tasks: [],
  isOnline: navigator.onLine,
  loading: false,
  error: null,

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
      await db.tasks.delete(id);

      // Add to sync queue
      await db.syncQueue.add({
        action: 'delete',
        taskId: id,
        payload: {},
        timestamp: new Date(),
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
}));
