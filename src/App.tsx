import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
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