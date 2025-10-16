import { useState } from "react";
import { EmployeeSidebar } from "./components/employee/EmployeeSidebar";
import { EmployeeHeader } from "./components/employee/EmployeeHeader";
import { EmployeeDashboard } from "./components/employee/pages/EmployeeDashboard";
import { ApplyLeave } from "./components/employee/pages/ApplyLeave";
import { LeaveHistory } from "./components/employee/pages/LeaveHistory";
import { EmployeeProfile } from "./components/employee/pages/EmployeeProfile";
import { Toaster } from "./components/ui/sonner";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Mail } from "lucide-react";

const userName = "Ahmad Wijaya";
const userRole = "Senior Frontend Developer";

export default function EmployeeApp() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <EmployeeDashboard onNavigate={setActiveTab} userName={userName} />;
      case "apply-leave":
        return <ApplyLeave />;
      case "leave-history":
        return <LeaveHistory />;
      case "profile":
        return <EmployeeProfile />;
      case "help":
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[#1E293B]">Bantuan ❓</h1>
              <p className="text-[#64748B] mt-1">Dapatkan bantuan untuk menggunakan sistem</p>
            </div>
            
            <Card className="border-l-4 border-l-[#06B6D4]">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#06B6D4] to-[#2563EB] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
                    Butuh Bantuan?
                  </h2>
                  <p className="text-[#64748B] mb-6 max-w-md mx-auto">
                    Tim HR kami siap membantu Anda dengan pertanyaan seputar cuti,
                    profil, atau sistem secara umum.
                  </p>
                  <div className="space-y-3">
                    <div className="bg-[#F8FAFC] p-4 rounded-lg">
                      <p className="text-sm text-[#64748B] mb-1">Email</p>
                      <p className="font-semibold text-[#1E293B]">hr@company.com</p>
                    </div>
                    <div className="bg-[#F8FAFC] p-4 rounded-lg">
                      <p className="text-sm text-[#64748B] mb-1">Telepon</p>
                      <p className="font-semibold text-[#1E293B]">+62 21 1234 5678</p>
                    </div>
                    <div className="bg-[#F8FAFC] p-4 rounded-lg">
                      <p className="text-sm text-[#64748B] mb-1">Jam Operasional</p>
                      <p className="font-semibold text-[#1E293B]">Senin - Jumat, 09:00 - 17:00 WIB</p>
                    </div>
                  </div>
                  <Button
                    className="mt-6 bg-gradient-to-r from-[#06B6D4] to-[#2563EB]"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Hubungi HR Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-[#1E293B] mb-3">FAQ - Pengajuan Cuti</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-[#1E293B]">Berapa lama proses approval?</p>
                      <p className="text-[#64748B]">Biasanya 1-2 hari kerja</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#1E293B]">Apakah bisa membatalkan cuti?</p>
                      <p className="text-[#64748B]">Ya, jika masih dalam status pending</p>
                    </div>
                    <div>
                      <p className="font-medium text-[#1E293B]">Dokumen apa yang perlu dilampirkan?</p>
                      <p className="text-[#64748B]">Untuk cuti sakit perlu surat keterangan dokter</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-[#1E293B] mb-3">Tips Penggunaan</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-2">
                      <span>💡</span>
                      <p className="text-[#64748B]">Ajukan cuti minimal 3 hari sebelumnya</p>
                    </div>
                    <div className="flex gap-2">
                      <span>💡</span>
                      <p className="text-[#64748B]">Periksa kuota cuti sebelum mengajukan</p>
                    </div>
                    <div className="flex gap-2">
                      <span>💡</span>
                      <p className="text-[#64748B]">Aktifkan notifikasi untuk update status</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return <EmployeeDashboard onNavigate={setActiveTab} userName={userName} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Sidebar */}
      <EmployeeSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <EmployeeHeader
          userName={userName}
          userRole={userRole}
          currentPage={activeTab}
          onNavigate={setActiveTab}
        />

        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      <Toaster />
    </div>
  );
}
