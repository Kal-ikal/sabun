import { Home, FileText, History, User, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../ui/utils";

interface EmployeeSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, emoji: "🏠" },
  { id: "apply-leave", label: "Ajukan Cuti", icon: FileText, emoji: "📝" },
  { id: "leave-history", label: "Riwayat Cuti", icon: History, emoji: "📋" },
  { id: "profile", label: "Profil Saya", icon: User, emoji: "👤" },
  { id: "help", label: "Bantuan", icon: HelpCircle, emoji: "❓" },
];

export function EmployeeSidebar({ activeTab, onTabChange }: EmployeeSidebarProps) {
  return (
    <aside className="w-64 h-screen bg-white border-r border-[#E2E8F0] flex flex-col sticky top-0 shadow-sm">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#2563EB] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">EP</span>
          </div>
          <div>
            <h2 className="font-bold text-[#1E293B]">Employee Portal</h2>
            <p className="text-xs text-[#64748B]">Self Service</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative overflow-hidden group",
                    isActive 
                      ? "bg-gradient-to-r from-[#06B6D4] to-[#2563EB] text-white shadow-lg shadow-[#06B6D4]/30" 
                      : "text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B]"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="employeeActiveTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] to-[#2563EB]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 text-lg">{item.emoji}</span>
                  <Icon className={cn("w-5 h-5 relative z-10")} />
                  <span className="relative z-10 font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#E2E8F0]">
        <div className="bg-gradient-to-br from-[#EFF6FF] to-[#F0F9FF] rounded-lg p-4">
          <p className="text-sm font-medium text-[#1E293B] mb-1">Need Help?</p>
          <p className="text-xs text-[#64748B] mb-2">Contact HR Support</p>
          <button className="text-xs text-[#06B6D4] font-medium hover:underline">
            hr@company.com
          </button>
        </div>
      </div>
    </aside>
  );
}
