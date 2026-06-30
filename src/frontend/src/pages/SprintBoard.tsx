import { useState } from "react";
import { Plus } from "lucide-react";
import { Badge } from "../components/common/Badge";

interface Issue {
  id: number;
  title: string;
  type: string;
  priority: string;
  assignee: string;
}

interface Column {
  id: string;
  title: string;
  issues: Issue[];
}

const columnsData: Column[] = [
  { id: "backlog", title: "Backlog", issues: [
    { id: 1, title: "Implement dark mode", type: "feature", priority: "high", assignee: "Abdulraheem" }
  ]},
  { id: "todo", title: "To Do", issues: [
    { id: 2, title: "Fix login bug", type: "bug", priority: "critical", assignee: "Developer" }
  ]},
  { id: "in_progress", title: "In Progress", issues: [
    { id: 3, title: "User authentication", type: "feature", priority: "high", assignee: "Abdulraheem" }
  ]},
  { id: "review", title: "Code Review", issues: [] },
  { id: "testing", title: "Testing", issues: [] },
  { id: "done", title: "Done", issues: [
    { id: 4, title: "Setup project", type: "task", priority: "high", assignee: "Abdulraheem" }
  ]},
];

export default function SprintBoard() {
  const [columns] = useState<Column[]>(columnsData);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sprint Board</h1>
          <p className="text-muted-foreground">Manage your sprint workflow</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          <Plus className="w-4 h-4" />
          <span>New Issue</span>
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-1 min-w-[250px] p-4 rounded-xl glass">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{column.title}</h3>
              <Badge variant="secondary">{column.issues.length}</Badge>
            </div>
            <div className="space-y-3">
              {column.issues.map((issue) => (
                <div key={issue.id} className="p-3 rounded-lg bg-card border border-border">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-medium px-2 py-0.5 bg-muted rounded">
                      {issue.type}
                    </span>
                    <span className="text-xs">#{issue.id}</span>
                  </div>
                  <h4 className="font-medium text-sm">{issue.title}</h4>
                  <span className="text-xs text-muted-foreground">{issue.assignee}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}