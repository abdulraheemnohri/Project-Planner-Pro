"""
Dark Theme Plugin
"""

import { ThemePlugin } from "../../types/plugin";

export const darkThemePlugin: ThemePlugin = {
  id: "dark-theme",
  name: "Dark Theme",
  description: "Dark theme for Project Planner Pro",
  version: "1.0.0",
  author: "Project Planner Pro",
  type: "theme",
  enabled: true,
  styles: {
    background: "bg-gray-900",
    text: "text-gray-100",
    card: "bg-gray-800",
    border: "border-gray-700",
  },
  colors: {
    primary: "#8b5cf6",
    secondary: "#3b82f6",
    background: "#0f172a",
    text: "#f8fafc",
  },
};

export default darkThemePlugin;