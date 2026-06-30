import { useState, useEffect } from "react";
import { localStorage, syncStorage, offlineMode } from "../utils/storage";
import toast from "react-hot-toast";

interface OfflineData {
  projects: any[];
  sprints: any[];
  issues: any[];
  lastSync: string;
}

export function useOfflineMode() {
  const [isOffline, setIsOffline] = useState(false);
  const [offlineData, setOfflineData] = useState<OfflineData>({
    projects: [],
    sprints: [],
    issues: [],
    lastSync: "",
  });

  useEffect(() => {
    // Check online/offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Initial check
    setIsOffline(!navigator.onLine);

    // Load offline data
    const data = localStorage.get();
    setOfflineData({
      projects: data.projects || [],
      sprints: data.sprints || [],
      issues: data.issues || [],
      lastSync: data.lastSync || "",
    });

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const saveOffline = (key: string, data: any) => {
    syncStorage.save(key, data);
    setOfflineData((prev) => ({
      ...prev,
      [key]: data,
      lastSync: new Date().toISOString(),
    }));
    toast.success("Data saved offline!");
  };

  const syncWithServer = async () => {
    if (!isOffline) {
      try {
        // Sync projects
        if (offlineData.projects.length > 0) {
          await Promise.all(
            offlineData.projects.map(async (project) => {
              await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(project),
              });
            })
          );
        }

        // Sync sprints
        if (offlineData.sprints.length > 0) {
          await Promise.all(
            offlineData.sprints.map(async (sprint) => {
              await fetch("/api/sprints", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sprint),
              });
            })
          );
        }

        // Sync issues
        if (offlineData.issues.length > 0) {
          await Promise.all(
            offlineData.issues.map(async (issue) => {
              await fetch("/api/issues", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(issue),
              });
            })
          );
        }

        // Clear offline data after sync
        localStorage.clear();
        setOfflineData({
          projects: [],
          sprints: [],
          issues: [],
          lastSync: new Date().toISOString(),
        });

        toast.success("Offline data synced with server!");
      } catch (error) {
        toast.error("Failed to sync offline data");
      }
    }
  };

  return {
    isOffline,
    offlineData,
    saveOffline,
    syncWithServer,
  };
}