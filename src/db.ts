import Dexie, { type Table } from 'dexie';

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
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
  }
}

export const db = new TaskDatabase();
