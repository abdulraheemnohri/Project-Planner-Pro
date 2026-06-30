import { useState } from "react";
import { Plus, GitBranch, GitCommit, GitPullRequest } from "lucide-react";

export default function Git() {
  const [repositories] = useState([
    { id: 1, name: "Project-Planner-Pro", provider: "GitHub", status: "connected", branch: "main" },
    { id: 2, name: "backend-api", provider: "GitHub", status: "connected", branch: "develop" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Git Integration</h1>
          <p className="text-muted-foreground">Connect and manage repositories</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          <Plus className="w-4 h-4" />
          <span>Connect Repository</span>
        </button>
      </div>
      <div className="space-y-4">
        {repositories.map((repo) => (
          <div key={repo.id} className="glass p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  <h3 className="font-semibold">{repo.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {repo.provider} - {repo.branch}
                </p>
              </div>
              <span className="text-xs px-2 py-1 bg-green-500/10 text-green-500 rounded-full">
                {repo.status}
              </span>
            </div>
            <div className="mt-4 flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <GitCommit className="w-3 h-3" />
                <span>12 commits</span>
              </div>
              <div className="flex items-center gap-1">
                <GitPullRequest className="w-3 h-3" />
                <span>3 PRs</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}