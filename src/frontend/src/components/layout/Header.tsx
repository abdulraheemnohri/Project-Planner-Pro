import { User, Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-border px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 bg-muted rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-muted rounded-lg">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-foreground" />
          </div>
          <span>Abdulraheem</span>
        </div>
      </div>
    </header>
  );
}