import { useState } from "react";
import { Plus, BookOpen, FileText } from "lucide-react";

export default function Docs() {
  const [docs] = useState([
    { id: 1, title: "Getting Started", type: "guide" },
    { id: 2, title: "API Reference", type: "api" },
    { id: 3, title: "Database Schema", type: "database" },
    { id: 4, title: "Deployment Guide", type: "guide" },
    { id: 5, title: "Security", type: "guide" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-muted-foreground">Built-in developer wiki</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg">
          <Plus className="w-4 h-4" />
          <span>New Document</span>
        </button>
      </div>
      <div className="space-y-4">
        {docs.map((doc) => (
          <div key={doc.id} className="glass p-4 rounded-xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">{doc.title}</h3>
                <p className="text-sm text-muted-foreground capitalize">{doc.type}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}