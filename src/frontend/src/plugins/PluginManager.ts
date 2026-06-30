"""
Plugin Manager - Manages all plugins
"""

import { Plugin, PluginType, PluginManifest, PluginContext, PluginAPI } from "../types/plugin";

class PluginManager {
  private plugins: Map<string, Plugin> = new Map();
  private manifests: Map<string, PluginManifest> = new Map();
  private api: PluginAPI;

  constructor(api: PluginAPI) {
    this.api = api;
  }

  // Load a plugin
  async loadPlugin(manifest: PluginManifest, context: PluginContext): Promise<Plugin | null> {
    try {
      // In a real implementation, you would dynamically import the plugin module
      // For now, we'll just create a basic plugin object
      const plugin: Plugin = {
        id: manifest.id,
        name: manifest.name,
        description: manifest.description,
        version: manifest.version,
        author: manifest.author,
        type: manifest.type,
        enabled: true,
        config: {},
      };

      // Store the plugin
      this.plugins.set(manifest.id, plugin);
      this.manifests.set(manifest.id, manifest);

      console.log(`Plugin loaded: ${manifest.name} (${manifest.id})`);
      return plugin;
    } catch (error) {
      console.error(`Failed to load plugin ${manifest.id}:`, error);
      return null;
    }
  }

  // Unload a plugin
  unloadPlugin(pluginId: string): boolean {
    if (this.plugins.has(pluginId)) {
      this.plugins.delete(pluginId);
      this.manifests.delete(pluginId);
      console.log(`Plugin unloaded: ${pluginId}`);
      return true;
    }
    return false;
  }

  // Enable a plugin
  enablePlugin(pluginId: string): boolean {
    const plugin = this.plugins.get(pluginId);
    if (plugin) {
      plugin.enabled = true;
      console.log(`Plugin enabled: ${pluginId}`);
      return true;
    }
    return false;
  }

  // Disable a plugin
  disablePlugin(pluginId: string): boolean {
    const plugin = this.plugins.get(pluginId);
    if (plugin) {
      plugin.enabled = false;
      console.log(`Plugin disabled: ${pluginId}`);
      return true;
    }
    return false;
  }

  // Get all plugins
  getPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }

  // Get plugins by type
  getPluginsByType(type: PluginType): Plugin[] {
    return Array.from(this.plugins.values()).filter(p => p.type === type);
  }

  // Get a specific plugin
  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId);
  }

  // Get plugin manifest
  getPluginManifest(pluginId: string): PluginManifest | undefined {
    return this.manifests.get(pluginId);
  }

  // Call a plugin method (in a real implementation)
  async callPluginMethod(pluginId: string, method: string, args: any[] = []): Promise<any> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} not found`);
    }

    // In a real implementation, you would call the actual plugin method
    // For now, we'll just return a mock response
    return { success: true, pluginId, method, args };
  }

  // Get available plugins (from a registry or marketplace)
  async getAvailablePlugins(): Promise<PluginManifest[]> {
    // In a real implementation, this would fetch from a plugin registry
    return [
      {
        id: "github-integration",
        name: "GitHub Integration",
        description: "Integrate with GitHub repositories",
        version: "1.0.0",
        author: "Project Planner Pro",
        type: "integration",
        entry: "plugins/github/index.ts",
        icon: "github",
        permissions: ["read:repo", "write:repo"],
      },
      {
        id: "dark-theme",
        name: "Dark Theme",
        description: "Dark theme for the application",
        version: "1.0.0",
        author: "Project Planner Pro",
        type: "theme",
        entry: "plugins/dark-theme/index.ts",
        permissions: [],
      },
      {
        id: "auto-assign",
        name: "Auto Assign",
        description: "Automatically assign issues to team members",
        version: "1.0.0",
        author: "Project Planner Pro",
        type: "automation",
        entry: "plugins/auto-assign/index.ts",
        permissions: ["read:issues", "write:issues"],
      },
    ];
  }
}

// Singleton instance
export const pluginManager = new PluginManager({
  get: async (url: string) => {
    const response = await fetch(url);
    return response.json();
  },
  post: async (url: string, data: any) => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  put: async (url: string, data: any) => {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  delete: async (url: string) => {
    const response = await fetch(url, { method: "DELETE" });
    return response.json();
  },
  storage: {
    get: async (key: string) => {
      return localStorage.getItem(key);
    },
    set: async (key: string, value: any) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    remove: async (key: string) => {
      localStorage.removeItem(key);
    },
  },
  notify: (message: string, type: "info" | "success" | "warning" | "error" = "info") => {
    console.log(`[${type.toUpperCase()}] ${message}`);
  },
  log: (message: string, level: "debug" | "info" | "warning" | "error" = "info") => {
    console[level](message);
  },
});

export default PluginManager;