import { useState } from "react";
import { User, Bell, Key, Moon, Sun } from "lucide-react";

export default function Settings() {
  const [theme, setTheme] = useState("dark");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your preferences</p>
      </div>
      
      <div className="space-y-6">
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Abdulraheem Nohari</p>
                <p className="text-sm text-muted-foreground">abdulraheemnohari@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Appearance</h2>
          <div className="flex gap-4">
            <button
              onClick={() => setTheme("light")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80"
            >
              <Sun className="w-5 h-5" />
              <span>Light</span>
            </button>
            <button
              onClick={() => setTheme("dark")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground"
            >
              <Moon className="w-5 h-5" />
              <span>Dark</span>
            </button>
          </div>
        </div>
        
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Notifications</h2>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email notifications for important updates</p>
            </div>
            <div className="w-12 h-6 bg-muted rounded-full relative">
              <div className="w-5 h-5 bg-primary rounded-full absolute top-0.5 right-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}