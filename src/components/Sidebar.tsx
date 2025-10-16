<<<<<<< HEAD
import { LayoutDashboard, FileText, Users, BarChart3, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "./ui/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "leave", label: "Persetujuan Cuti", icon: FileText },
  { id: "employees", label: "Manajemen Karyawan", icon: Users },
  { id: "reports", label: "Sistem Laporan", icon: BarChart3 },
  { id: "settings", label: "Pengaturan", icon: Settings },
];

export function Sidebar({ activeTab, onTabChange, isCollapsed, onToggle }: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen bg-surface border-r border-border-color flex flex-col sticky top-0 shadow-sm"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-border-color">
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <span className="text-[#1E293B] font-semibold">Admin Portal</span>
          </motion.div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">AD</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 relative overflow-hidden group",
                    isActive 
                      ? "bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30" 
                      : "text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1E293B]"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#2563EB]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon className={cn("w-5 h-5 relative z-10", isCollapsed && "mx-auto")} />
                  {!isCollapsed && (
                    <span className="relative z-10 font-medium text-sm">{item.label}</span>
                  )}
                </button>
=======
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
>>>>>>> 893e9817e2179c9f18b4f50f52f0f9a2c206b684
              </li>
            );
          })}
        </ul>
      </nav>

<<<<<<< HEAD
      {/* Toggle Button */}
      <div className="p-3 border-t border-border-color">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-3 rounded-lg hover:bg-[#F1F5F9] text-[#64748B] transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
}
=======
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
>>>>>>> 893e9817e2179c9f18b4f50f52f0f9a2c206b684
