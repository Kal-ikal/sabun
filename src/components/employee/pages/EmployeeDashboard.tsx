import { Calendar, Clock, CheckCircle, XCircle, Plus, Eye, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { motion } from "motion/react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const leaveQuotaData = [
  { name: "Digunakan", value: 8, color: "#06B6D4" },
  { name: "Tersisa", value: 4, color: "#E2E8F0" },
];

const upcomingLeaves = [
  {
    id: 1,
    type: "Cuti Tahunan",
    startDate: "20 Okt 2025",
    endDate: "25 Okt 2025",
    daysLeft: 6,
    status: "approved",
  },
  {
    id: 2,
    type: "Cuti Tahunan",
    startDate: "15 Des 2025",
    endDate: "20 Des 2025",
    daysLeft: 62,
    status: "approved",
  },
];

const recentActivities = [
  {
    id: 1,
    title: "Permohonan cuti disetujui",
    description: "Cuti tanggal 20-25 Oktober 2025 telah disetujui oleh atasan",
    time: "2 jam yang lalu",
    type: "success",
    icon: "✅",
  },
  {
    id: 2,
    title: "Dokumen diperlukan",
    description: "Mohon upload surat keterangan sakit untuk pengajuan 10 Oktober",
    time: "1 hari yang lalu",
    type: "warning",
    icon: "📄",
  },
  {
    id: 3,
    title: "Pengajuan cuti sedang diproses",
    description: "Pengajuan cuti sakit sedang dalam review",
    time: "2 hari yang lalu",
    type: "info",
    icon: "⏳",
  },
];

interface EmployeeDashboardProps {
  onNavigate: (page: string) => void;
  userName: string;
}

export function EmployeeDashboard({ onNavigate, userName }: EmployeeDashboardProps) {
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12 ? "Selamat pagi" : currentHour < 18 ? "Selamat siang" : "Selamat malam";

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#06B6D4] via-[#0891B2] to-[#2563EB] rounded-xl p-8 text-white shadow-lg"
      >
        <h1 className="text-3xl font-bold mb-2">
          {greeting}, {userName}! 🎉
        </h1>
        <p className="text-blue-100 text-lg">
          Ready untuk ajukan cuti hari ini? Semua informasi cuti Anda ada di sini.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-l-4 border-l-[#06B6D4] hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Sisa Cuti Tahun Ini</p>
                  <h3 className="text-3xl font-bold text-[#1E293B]">4</h3>
                  <p className="text-xs text-[#64748B] mt-1">dari 12 hari</p>
                </div>
                <div className="w-16 h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={leaveQuotaData}
                        cx="50%"
                        cy="50%"
                        innerRadius={20}
                        outerRadius={30}
                        dataKey="value"
                      >
                        {leaveQuotaData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <Progress value={(8 / 12) * 100} className="mt-4 h-2" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-l-4 border-l-[#F59E0B] hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Cuti Pending</p>
                  <h3 className="text-3xl font-bold text-[#1E293B]">1</h3>
                  <p className="text-xs text-[#64748B] mt-1">menunggu approval</p>
                </div>
                <div className="w-12 h-12 bg-[#FEF3C7] rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#F59E0B]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-l-4 border-l-[#10B981] hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Cuti Disetujui</p>
                  <h3 className="text-3xl font-bold text-[#1E293B]">7</h3>
                  <p className="text-xs text-[#64748B] mt-1">tahun ini</p>
                </div>
                <div className="w-12 h-12 bg-[#D1FAE5] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#10B981]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-l-4 border-l-[#EF4444] hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#64748B] mb-1">Cuti Ditolak</p>
                  <h3 className="text-3xl font-bold text-[#1E293B]">0</h3>
                  <p className="text-xs text-[#64748B] mt-1">tahun ini</p>
                </div>
                <div className="w-12 h-12 bg-[#FEE2E2] rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-[#EF4444]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Time Off */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#06B6D4]" />
                Upcoming Time Off
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("leave-history")}
              >
                Lihat Semua
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingLeaves.length > 0 ? (
                upcomingLeaves.map((leave) => (
                  <motion.div
                    key={leave.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-[#F0F9FF] to-[#EFF6FF] rounded-lg border border-[#BAE6FD] hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#06B6D4] to-[#2563EB] rounded-lg flex items-center justify-center text-white shadow-lg">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1E293B]">{leave.type}</h4>
                        <p className="text-sm text-[#64748B]">
                          {leave.startDate} - {leave.endDate}
                        </p>
                        <Badge className="mt-1 bg-[#10B981] text-white">
                          Disetujui
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-[#06B6D4] font-bold">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-2xl">{leave.daysLeft}</span>
                      </div>
                      <p className="text-xs text-[#64748B]">hari lagi</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-[#CBD5E1]" />
                  </div>
                  <p className="text-[#64748B] mb-2">Belum ada cuti yang dijadwalkan</p>
                  <Button
                    onClick={() => onNavigate("apply-leave")}
                    className="bg-gradient-to-r from-[#06B6D4] to-[#2563EB] hover:opacity-90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajukan Cuti Sekarang
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#06B6D4]" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 p-3 bg-[#F8FAFC] rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                >
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1">
                    <h5 className="font-medium text-sm text-[#1E293B]">{activity.title}</h5>
                    <p className="text-xs text-[#64748B] mt-1">{activity.description}</p>
                    <p className="text-xs text-[#94A3B8] mt-1">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => onNavigate("apply-leave")}
              className="h-auto py-6 flex flex-col gap-3 bg-gradient-to-r from-[#06B6D4] to-[#2563EB] hover:opacity-90 shadow-lg shadow-[#06B6D4]/30"
            >
              <Plus className="w-8 h-8" />
              <div>
                <span className="block font-bold text-lg">Ajukan Cuti Baru</span>
                <span className="text-xs opacity-90">Buat permohonan cuti dengan mudah</span>
              </div>
            </Button>
            <Button
              onClick={() => onNavigate("leave-history")}
              variant="outline"
              className="h-auto py-6 flex flex-col gap-3 border-2 border-[#06B6D4] text-[#06B6D4] hover:bg-[#F0F9FF]"
            >
              <Eye className="w-8 h-8" />
              <div>
                <span className="block font-bold text-lg">Lihat Riwayat Cuti</span>
                <span className="text-xs">Pantau status semua pengajuan Anda</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
