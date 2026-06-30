import { useState } from "react";
import { Plus, Package, Calendar } from "lucide-react";

export default function Releases() {
  const [releases] = useState([
    { id: 1, version: "v2.5.0", date: "2026-06-30", status: "released", changes: ["Added dark mode", "Fixed login bug"] },
    { id: 2, version: "v3.0.0", date: "2026-08-30", status: "planned", changes: ["New features"] },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Releases</h1>
          <p className="text-muted-foreground">Manage software releases</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          <Plus className="w-4 h-4" />
          <span>New Release</span>
        </button>
      </div>
      <div className="space-y-4">
        {releases.map((release) => (
          <div key={release.id} className="glass p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  <h3 className="font-semibold">{release.version}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  <Calendar className="w-3 h-3 inline" /> {release.date}
                </p>
              </div>
              <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
                {release.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}