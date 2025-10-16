import { Bell, LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface EmployeeHeaderProps {
  userName: string;
  userRole: string;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  "apply-leave": "Ajukan Cuti",
  "leave-history": "Riwayat Cuti",
  profile: "Profil Saya",
  help: "Bantuan",
};

export function EmployeeHeader({ userName, userRole, currentPage, onNavigate }: EmployeeHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] sticky top-0 z-10 shadow-sm">
      <div className="h-full flex items-center justify-between px-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="cursor-pointer text-[#64748B] hover:text-[#06B6D4]"
                onClick={() => onNavigate("dashboard")}
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#1E293B] font-medium">
                {pageTitles[currentPage] || "Dashboard"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="w-5 h-5 text-[#64748B]" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#06B6D4] text-white flex items-center justify-center p-0 text-xs">
                  2
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifikasi Personal</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
                <div className="flex items-start gap-2 w-full">
                  <span className="text-lg">✅</span>
                  <div className="flex-1">
                    <span className="font-medium text-sm block">Cuti Disetujui!</span>
                    <span className="text-xs text-[#64748B]">
                      Permohonan cuti tanggal 20-25 Oktober telah disetujui
                    </span>
                    <span className="text-xs text-[#64748B] mt-1 block">2 jam yang lalu</span>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3 cursor-pointer">
                <div className="flex items-start gap-2 w-full">
                  <span className="text-lg">📝</span>
                  <div className="flex-1">
                    <span className="font-medium text-sm block">Reminder</span>
                    <span className="text-xs text-[#64748B]">
                      Jangan lupa upload surat keterangan sakit
                    </span>
                    <span className="text-xs text-[#64748B] mt-1 block">1 hari yang lalu</span>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 hover:bg-[#F8FAFC] rounded-lg px-3 py-2 transition-colors">
                <Avatar className="ring-2 ring-[#06B6D4]/20">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=employee" />
                  <AvatarFallback className="bg-gradient-to-br from-[#06B6D4] to-[#2563EB] text-white">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <div className="font-medium text-sm text-[#1E293B]">{userName}</div>
                  <div className="text-xs text-[#64748B]">{userRole}</div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">{userName}</p>
                  <p className="text-xs text-[#64748B] font-normal">{userRole}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onNavigate("profile")}
              >
                <User className="w-4 h-4 mr-2" />
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Pengaturan
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[#EF4444] cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
