"""
Local Storage Utilities for Offline Mode
"""

interface StorageData {
  projects?: any[];
  sprints?: any[];
  issues?: any[];
  lastSync?: string;
}

const STORAGE_KEY = "project_planner_pro_offline_data";

export const localStorage = {
  get: (): StorageData => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    }
    return {};
  },

  set: (data: StorageData) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  },

  clear: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  },

  getItem: <T>(key: string): T | null => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  },

  setItem: <T>(key: string, value: T) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  },

  removeItem: (key: string) => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  },
};

export const syncStorage = {
  save: (key: string, data: any) => {
    const currentData = localStorage.get();
    currentData[key] = data;
    currentData.lastSync = new Date().toISOString();
    localStorage.set(currentData);
  },

  get: (key: string) => {
    const currentData = localStorage.get();
    return currentData[key];
  },

  syncAll: (data: StorageData) => {
    localStorage.set(data);
  },

  clear: () => {
    localStorage.clear();
  },
};

export const offlineMode = {
  isEnabled: () => {
    return typeof window !== "undefined" && !navigator.onLine;
  },

  enable: () => {
    if (typeof window !== "undefined") {
      window.addEventListener("offline", () => {
        console.log("Offline mode enabled");
      });
      window.addEventListener("online", () => {
        console.log("Online mode enabled");
        // Sync data when back online
      });
    }
  },
};

export default localStorage;