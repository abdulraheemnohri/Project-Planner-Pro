import { useQuery } from "@tanstack/react-query";
import { Rocket, Folder, Bug, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here is your project overview.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass p-6 rounded-xl">
          <h3 className="text-sm font-medium">Total Projects</h3>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="glass p-6 rounded-xl">
          <h3 className="text-sm font-medium">Active Sprints</h3>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="glass p-6 rounded-xl">
          <h3 className="text-sm font-medium">Open Issues</h3>
          <div className="text-2xl font-bold">0</div>
        </div>
        <div className="glass p-6 rounded-xl">
          <h3 className="text-sm font-medium">Team Members</h3>
          <div className="text-2xl font-bold">0</div>
        </div>
      </div>
    </div>
  );
}