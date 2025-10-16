import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
<<<<<<< HEAD
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
=======
import { Header } from "./components/Header";
import { StatsCards } from "./components/StatsCards";
import { AssetTable } from "./components/AssetTable";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { ProfilePage } from "./components/ProfilePage";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { Toaster } from "./components/ui/sonner";

type Page = "login" | "register" | "dashboard" | "profile";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("login");
  const { isAuthenticated } = useAuth();

  // Initialize demo data on first load
  useEffect(() => {
    // Seed demo data will be handled by user registration
    // Users can create accounts via the signup page
  }, []);

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated && (currentPage === "login" || currentPage === "register")) {
      setCurrentPage("dashboard");
    } else if (!isAuthenticated && (currentPage === "dashboard" || currentPage === "profile")) {
      setCurrentPage("login");
    }
  }, [isAuthenticated, currentPage]);

  if (currentPage === "login") {
    return <LoginPage onNavigateToRegister={() => setCurrentPage("register")} />;
  }

  if (currentPage === "register") {
    return <RegisterPage onNavigateToLogin={() => setCurrentPage("login")} />;
  }

  if (currentPage === "profile") {
    return <ProfilePage onNavigateBack={() => setCurrentPage("dashboard")} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-auto">
        <div className="p-4 md:p-8">
          {/* Header with mobile menu */}
          <Header onNavigateToProfile={() => setCurrentPage("profile")} />
          
          {/* Statistics Cards */}
          <StatsCards />
          
          {/* Asset Table */}
          <AssetTable />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}
>>>>>>> 893e9817e2179c9f18b4f50f52f0f9a2c206b684
