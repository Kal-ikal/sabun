import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopNav } from "./components/TopNav";
import { Dashboard } from "./components/pages/Dashboard";
import { LeaveApproval } from "./components/pages/LeaveApproval";
import { Employees } from "./components/pages/Employees";
import { Reports } from "./components/pages/Reports";
import EmployeeApp from "./EmployeeApp";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { Users, UserCircle } from "lucide-react";

export default function App() {
  const [mode, setMode] = useState<"admin" | "employee">("employee");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "leave":
        return <LeaveApproval />;
      case "employees":
        return <Employees />;
      case "reports":
        return <Reports />;
      case "settings":
        return (
          <div className="p-6">
            <div className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-lg p-12 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Pengaturan</h2>
              <p className="text-blue-100">Halaman pengaturan sedang dalam pengembangan</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  // Mode Switcher
  const ModeSwitcher = () => (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white rounded-lg shadow-lg p-2 border border-[#E2E8F0]">
      <Button
        size="sm"
        variant={mode === "employee" ? "default" : "outline"}
        onClick={() => setMode("employee")}
        className={mode === "employee" ? "bg-gradient-to-r from-[#06B6D4] to-[#2563EB]" : ""}
      >
        <UserCircle className="w-4 h-4 mr-2" />
        Employee
      </Button>
      <Button
        size="sm"
        variant={mode === "admin" ? "default" : "outline"}
        onClick={() => setMode("admin")}
        className={mode === "admin" ? "bg-gradient-to-r from-[#2563EB] to-[#7C3AED]" : ""}
      >
        <Users className="w-4 h-4 mr-2" />
        Admin
      </Button>
    </div>
  );

  if (mode === "employee") {
    return (
      <>
        <ModeSwitcher />
        <EmployeeApp />
      </>
    );
  }

  return (
    <>
      <ModeSwitcher />
      <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNav isDark={isDark} onToggleDark={() => setIsDark(!isDark)} />
          
          <main className="flex-1 overflow-y-auto">
            {renderContent()}
          </main>
        </div>

        <Toaster />
      </div>
    </>
  );
}
