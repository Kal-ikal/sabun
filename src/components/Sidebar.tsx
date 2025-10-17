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
              </li>
            );
          })}
        </ul>
      </nav>

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
