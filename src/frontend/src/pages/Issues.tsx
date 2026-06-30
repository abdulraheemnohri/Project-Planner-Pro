import { useState } from "react";
import { Plus, Bug, Type, Zap, AlertCircle, BookOpen } from "lucide-react";

export default function Issues() {
  const [issues] = useState([
    { id: 1024, title: "Login API returning 500 error", type: "bug", priority: "critical", status: "in_progress", assignee: "Developer" },
    { id: 1025, title: "Add dark mode support", type: "feature", priority: "high", status: "todo", assignee: "Designer" },
    { id: 1026, title: "Improve performance", type: "enhancement", priority: "medium", status: "backlog", assignee: "" },
  ]);

  const issueTypes = [
    { icon: Bug, label: "Bug", color: "text-red-500" },
    { icon: Type, label: "Feature", color: "text-green-500" },
    { icon: Zap, label: "Enhancement", color: "text-blue-500" },
    { icon: AlertCircle, label: "Security", color: "text-purple-500" },
    { icon: BookOpen, label: "Documentation", color: "text-gray-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Issues</h1>
          <p className="text-muted-foreground">Track and manage issues</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          <Plus className="w-4 h-4" />
          <span>New Issue</span>
        </button>
      </div>
      <div className="flex gap-2 mb-4">
        {issueTypes.map((type) => (
          <button
            key={type.label}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-muted rounded-full"
          >
            <type.icon className={"w-3 h-3 " + type.color} />
            <span>{type.label}</span>
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {issues.map((issue) => (
          <div key={issue.id} className="glass p-4 rounded-xl">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <span className="text-sm text-muted-foreground">#{issue.id}</span>
                <div>
                  <h3 className="font-medium">{issue.title}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full capitalize">
                      {issue.type}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full capitalize">
                      {issue.priority}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full capitalize">
                      {issue.status}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{issue.assignee}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}