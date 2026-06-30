"""
Plugin System Types
"""

// Plugin types
export type PluginType = 
  | "integration"
  | "theme"
  | "automation"
  | "custom";

// Plugin interface
export interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  type: PluginType;
  enabled: boolean;
  config?: Record<string, any>;
}

// Integration plugin
export interface IntegrationPlugin extends Plugin {
  type: "integration";
  service: string; // github, gitlab, slack, etc.
  authRequired: boolean;
  authConfig?: {
    clientId?: string;
    clientSecret?: string;
    accessToken?: string;
  };
}

// Theme plugin
export interface ThemePlugin extends Plugin {
  type: "theme";
  styles: Record<string, string>;
  colors: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
  };
}

// Automation plugin
export interface AutomationPlugin extends Plugin {
  type: "automation";
  triggers: string[]; // events that trigger this plugin
  actions: string[]; // actions this plugin can perform
  workflow?: {
    when: string;
    then: string[];
  };
}

// Plugin manifest
export interface PluginManifest {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  type: PluginType;
  entry: string; // Entry file path
  icon?: string;
  permissions: string[];
}

// Plugin context
export interface PluginContext {
  app: {
    version: string;
    config: Record<string, any>;
  };
  user: {
    id: number;
    username: string;
    role: string;
  };
  project?: {
    id: number;
    name: string;
  };
  // Add more context as needed
}

// Plugin API
export interface PluginAPI {
  get: (url: string, options?: RequestInit) => Promise<any>;
  post: (url: string, data: any, options?: RequestInit) => Promise<any>;
  put: (url: string, data: any, options?: RequestInit) => Promise<any>;
  delete: (url: string, options?: RequestInit) => Promise<any>;
  
  storage: {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
    remove: (key: string) => Promise<void>;
  };
  
  notify: (message: string, type?: "info" | "success" | "warning" | "error") => void;
  
  log: (message: string, level?: "debug" | "info" | "warning" | "error") => void;
}