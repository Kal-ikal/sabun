import { Home, Box, Users, BarChart3, Settings, User } from "lucide-react";
import { useAuth } from "./AuthContext";

const navigationItems = [
  { name: "Dashboard", icon: Home, href: "#", active: true },
  { name: "Aset", icon: Box, href: "#", active: false },
  { name: "Karyawan", icon: Users, href: "#", active: false },
  { name: "Laporan", icon: BarChart3, href: "#", active: false },
  { name: "Pengaturan", icon: Settings, href: "#", active: false },
];

interface SidebarProps {
  className?: string;
  onItemClick?: () => void;
}

export function Sidebar({ className = "", onItemClick }: SidebarProps) {
  const { user: currentUser } = useAuth();
  return (
    <div className={`w-64 h-full bg-slate-800 text-slate-100 flex flex-col ${className}`}>
      {/* Logo */}
      <div className="p-6 border-b border-slate-700 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white">Annual</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={onItemClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700 flex-shrink-0">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 cursor-pointer" onClick={onItemClick}>
          <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{currentUser?.name || "User"}</p>
            <p className="text-xs text-slate-400 truncate">{currentUser?.email || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}