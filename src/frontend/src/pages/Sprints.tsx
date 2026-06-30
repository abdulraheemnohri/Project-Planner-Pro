import { useState } from "react";
import { Plus } from "lucide-react";

export default function Sprints() {
  const [sprints] = useState([
    { id: 1, name: "Sprint 12", goal: "Complete User Authentication", days: "5 / 14", status: "active" },
    { id: 2, name: "Sprint 11", goal: "API Integration", days: "14 / 14", status: "completed" },
    { id: 3, name: "Sprint 13", goal: "Mobile App", days: "0 / 14", status: "planned" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sprints</h1>
          <p className="text-muted-foreground">Manage your sprints</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          <Plus className="w-4 h-4" />
          <span>New Sprint</span>
        </button>
      </div>
      <div className="space-y-4">
        {sprints.map((sprint) => (
          <div key={sprint.id} className="glass p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{sprint.name}</h3>
                <p className="text-sm text-muted-foreground">{sprint.goal}</p>
              </div>
              <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
                {sprint.status}
              </span>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Day {sprint.days}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}