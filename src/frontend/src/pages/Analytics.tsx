import { useState } from "react";
import { BarChart2, PieChart } from "lucide-react";

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Developer productivity insights</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Sprint Velocity</h2>
          </div>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
        <div className="glass p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <PieChart className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Bug Distribution</h2>
          </div>
          <p className="text-muted-foreground">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}