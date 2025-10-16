import { Bell, Search, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

interface TopNavProps {
  isDark: boolean;
  onToggleDark: () => void;
}

export function TopNav({ isDark, onToggleDark }: TopNavProps) {
  return (
    <header className="h-16 bg-surface border-b border-border-color sticky top-0 z-10 shadow-sm">
      <div className="h-full flex items-center justify-between px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <Input
              placeholder="Cari karyawan, laporan, atau dokumen..."
              className="pl-10 bg-[#F8FAFC] border-[#E2E8F0] focus:ring-2 focus:ring-[#2563EB]/20"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDark}
            className="rounded-full"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-[#64748B]" />
            ) : (
              <Moon className="w-5 h-5 text-[#64748B]" />
            )}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="w-5 h-5 text-[#64748B]" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#EF4444] text-white flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <span className="font-medium text-sm">Permohonan cuti baru</span>
                <span className="text-xs text-[#64748B]">John Doe mengajukan cuti tahunan</span>
                <span className="text-xs text-[#64748B] mt-1">5 menit yang lalu</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <span className="font-medium text-sm">Data karyawan diperbarui</span>
                <span className="text-xs text-[#64748B]">3 profil karyawan telah diperbarui</span>
                <span className="text-xs text-[#64748B] mt-1">1 jam yang lalu</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3">
                <span className="font-medium text-sm">Laporan bulanan tersedia</span>
                <span className="text-xs text-[#64748B]">Laporan Oktober 2025 telah dibuat</span>
                <span className="text-xs text-[#64748B] mt-1">2 jam yang lalu</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 hover:bg-[#F8FAFC] rounded-lg px-2 py-1 transition-colors">
                <Avatar>
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <div className="font-medium text-sm text-[#1E293B]">Admin User</div>
                  <div className="text-xs text-[#64748B]">admin@company.com</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Pengaturan</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[#EF4444]">Keluar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
