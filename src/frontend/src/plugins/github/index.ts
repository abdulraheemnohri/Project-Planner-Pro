"""
GitHub Integration Plugin
"""

import { IntegrationPlugin } from "../../types/plugin";

export const githubPlugin: IntegrationPlugin = {
  id: "github-integration",
  name: "GitHub Integration",
  description: "Integrate with GitHub repositories for commit tracking and PR management",
  version: "1.0.0",
  author: "Project Planner Pro",
  type: "integration",
  service: "github",
  authRequired: true,
  enabled: false,
  authConfig: {
    clientId: "",
    clientSecret: "",
    accessToken: "",
  },
  config: {
    autoSync: true,
    syncInterval: 60, // seconds
    trackCommits: true,
    trackPRs: true,
  },
};

export default githubPlugin;