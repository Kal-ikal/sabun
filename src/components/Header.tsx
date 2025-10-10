import { Search, Menu, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./ui/sheet";
import { Sidebar } from "./Sidebar";
import { useState } from "react";
import { useAuth } from "./AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  onNavigateToProfile: () => void;
}

export function Header({ onNavigateToProfile }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between mb-6 md:mb-8 gap-4">
      {/* Mobile menu and title */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-9 w-9 p-0"
            >
              <Menu size={20} />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64" aria-describedby="mobile-nav-description">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription id="mobile-nav-description" className="sr-only">
              Main navigation menu for the Annual asset management system
            </SheetDescription>
            <Sidebar onItemClick={() => setIsOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Title section */}
        <div className="min-w-0">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 truncate">Dashboard</h1>
          <p className="text-slate-600 mt-1 text-sm md:text-base hidden sm:block">
            Selamat datang di sistem manajemen aset Annual
          </p>
        </div>
      </div>
      
      {/* Right section with search and profile */}
      <div className="flex items-center gap-3">
        {/* Search bar */}
        <div className="relative w-32 sm:w-48 md:w-64 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          <Input
            type="text"
            placeholder="Cari aset..."
            className="pl-9 bg-white border-slate-300 focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 rounded-full hover:bg-slate-100"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="sr-only">Open user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onNavigateToProfile}>
              <User size={16} className="mr-2" />
              Profil Saya
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}