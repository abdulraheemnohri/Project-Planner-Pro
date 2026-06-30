import { Link, useLocation } from "react-router-dom";
import { Home, Folder, Rocket, Bug, Book, GitBranch, Package, BarChart2, Settings } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/projects", icon: Folder, label: "Projects" },
    { path: "/roadmap", icon: Rocket, label: "Roadmap" },
    { path: "/sprints", icon: Rocket, label: "Sprints" },
    { path: "/issues", icon: Bug, label: "Issues" },
    { path: "/docs", icon: Book, label: "Docs" },
    { path: "/git", icon: GitBranch, label: "Git" },
    { path: "/releases", icon: Package, label: "Releases" },
    { path: "/analytics", icon: BarChart2, label: "Analytics" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-card border-r border-border p-4">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Rocket className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">Project Planner Pro</span>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-muted"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}