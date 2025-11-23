import Dexie, { type Table } from 'dexie';

export type Priority = 'high' | 'medium' | 'low';

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  createdAt: Date;
  updatedAt: Date;
  synced: boolean;
}

export interface SyncQueue {
  id?: number;
  action: 'create' | 'update' | 'delete';
  taskId?: number;
  payload: Partial<Task>;
  timestamp: Date;
  retryCount: number;
}

export class TaskDatabase extends Dexie {
  tasks!: Table<Task, number>;
  syncQueue!: Table<SyncQueue, number>;

  constructor() {
    super('TaskManagerDB');

    this.version(1).stores({
      tasks: '++id, title, completed, createdAt, synced',
      syncQueue: '++id, taskId, timestamp, action'
    });

    // Version 2: Add priority field
    this.version(2).stores({
      tasks: '++id, title, completed, priority, createdAt, synced',
      syncQueue: '++id, taskId, timestamp, action'
    }).upgrade(tx => {
      return tx.table('tasks').toCollection().modify(task => {
        task.priority = task.priority || 'medium';
      });
    });
  }
}

export const db = new TaskDatabase();
