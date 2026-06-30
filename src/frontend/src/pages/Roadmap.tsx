import { useState } from "react";
import { Plus, Calendar } from "lucide-react";

export default function Roadmap() {
  const [roadmapItems] = useState([
    { id: 1, quarter: "Q1 2026", title: "Authentication System", status: "completed" },
    { id: 2, quarter: "Q2 2026", title: "Mobile App", status: "in_progress" },
    { id: 3, quarter: "Q3 2026", title: "Enterprise Version", status: "planned" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Product Roadmap</h1>
          <p className="text-muted-foreground">Plan your product development</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
        </button>
      </div>
      <div className="space-y-6">
        {["Q1 2026", "Q2 2026", "Q3 2026"].map((quarter) => (
          <div key={quarter} className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              {quarter}
            </h2>
            <div className="space-y-3">
              {roadmapItems.filter(item => item.quarter === quarter).map((item) => (
                <div key={item.id} className="glass p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{item.title}</h3>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}